import { describe, it } from "node:test";
import assert from "node:assert";
import jwt from "jsonwebtoken";
import { generateAuthTokens } from "./token";
import { config } from "../config";
import type { User } from "../models/client";

/**
 * Suite de tests pour la génération de tokens JWT
 * ===============================================
 * But : Vérifier que la fonction generateAuthTokens :
 *   1. Génère deux tokens (accessToken et refreshToken)
 *   2. Les deux tokens ont les bonnes expirations
 *   3. AccessToken contient userId et role (données sensibles)
 *   4. RefreshToken contient SEULEMENT un ID unique (données minimales)
 *   5. Les tokens sont signés correctement avec le jwtSecret
 *   6. Chaque refreshToken est unique (sécurité)
 *
 * Contexte JWT :
 *   - AccessToken : Court terme (15 min), utilisé pour chaque requête
 *   - RefreshToken : Long terme (7 jours), utilisé pour renouveler l'accessToken
 */
describe("generateAuthTokens", () => {
  /**
   * Utilisateur fictif pour les tests
   * On utilise le même mock pour tous les tests
   */
  const mockUser: User = {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    pseudo: "johndoe",
    email: "john@skillfusion.io",
    password: "hashedPassword",
    roleId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as User;

  /**
   * Tests de la structure générale des tokens
   * Vérifie que la fonction retourne les bonnes clés avec les bonnes valeurs
   */
  describe("Token Structure", () => {
    it("should return both accessToken and refreshToken", () => {
      // ACT : Générer les tokens
      const tokens = generateAuthTokens(mockUser);

      // ASSERT : Vérifier que les deux tokens existent
      // - tokens.accessToken doit exister (objet)
      assert(tokens.accessToken, "accessToken should exist");
      // - tokens.refreshToken doit exister (objet)
      assert(tokens.refreshToken, "refreshToken should exist");
      // - tokens.accessToken.token doit contenir le JWT en string
      assert(tokens.accessToken.token, "accessToken.token should exist");
      // - tokens.refreshToken.token doit contenir le JWT en string
      assert(tokens.refreshToken.token, "refreshToken.token should exist");
    });

    it("should set correct expiration times", () => {
      // ACT : Générer les tokens
      const tokens = generateAuthTokens(mockUser);

      // ASSERT : Vérifier les durées d'expiration
      // - AccessToken expire en 15 minutes (15 * 60 * 1000 millisecondes)
      // Utilisé pour chaque requête, doit être court
      assert.strictEqual(tokens.accessToken.expiresIn, 15 * 60 * 1000);
      // - RefreshToken expire en 7 jours (7 * 24 * 60 * 60 * 1000 millisecondes)
      // Utilisé rarement, peut être plus long
      assert.strictEqual(tokens.refreshToken.expiresIn, 7 * 24 * 60 * 60 * 1000);
    });
  });

  /**
   * Tests spécifiques à l'AccessToken
   * L'accessToken est le token qu'on envoie dans le header Authorization
   * Contient les données nécessaires pour identifier l'utilisateur
   */
  describe("AccessToken", () => {
    it("should contain userId and role in payload", () => {
      // ACT : Générer les tokens et décoder l'accessToken
      const tokens = generateAuthTokens(mockUser);
      // jwt.verify() : Vérifie la signature ET retourne le contenu (payload)
      const decoded = jwt.verify(tokens.accessToken.token, config.jwtSecret) as any;

      // ASSERT : Vérifier que les données d'identification sont présentes
      // - userId permet de savoir quel utilisateur fait la requête
      assert.strictEqual(decoded.userId, mockUser.id);
      // - role permet de vérifier les permissions (admin, user, etc)
      assert.strictEqual(decoded.role, mockUser.roleId);  // ← roleId du mock
    });

    it("should have 'access' audience", () => {
      // ACT : Générer les tokens et décoder
      const tokens = generateAuthTokens(mockUser);
      const decoded = jwt.verify(tokens.accessToken.token, config.jwtSecret) as any;

      // ASSERT : Vérifier l'audience (aud)
      // L'audience permet de vérifier que ce token est du bon TYPE
      // Si quelqu'un essaie d'utiliser un refreshToken comme accessToken, ça échouera
      assert.strictEqual(decoded.aud, "access");
    });

    it("should expire in 15 minutes", () => {
      // ACT : Générer les tokens et décoder
      const tokens = generateAuthTokens(mockUser);
      const decoded = jwt.verify(tokens.accessToken.token, config.jwtSecret) as any;

      // ASSERT : Vérifier que l'expiration est correcte
      // - decoded.exp : timestamp Unix (secondes depuis 1970)
      // - now : timestamp actuel en secondes
      const now = Math.floor(Date.now() / 1000);
      const expiresIn = decoded.exp - now; // Temps restant en secondes
      // Devrait être ~15 minutes (900 secondes)
      // On tolère 1 seconde de variance (le temps que le test s'exécute)
      assert(expiresIn >= 14 * 60 - 1 && expiresIn <= 15 * 60 + 1);
    });
  });

  /**
   * Tests spécifiques au RefreshToken
   * Le refreshToken est stocké en DB et utilisé pour renouveler l'accessToken
   * Ne contient PAS les données sensibles (userId, role)
   * Contient seulement un ID unique qui sera vérifié en DB
   */
  describe("RefreshToken", () => {
    it("should contain refreshId in payload", () => {
      // ACT : Générer les tokens et décoder le refreshToken
      const tokens = generateAuthTokens(mockUser);
      const decoded = jwt.verify(tokens.refreshToken.token, config.jwtSecret) as any;

      // ASSERT : Vérifier que le refreshId existe et est une string
      // - decoded.refreshId doit exister (objet truthiness)
      assert(decoded.refreshId, "refreshId should exist");
      // - refreshId doit être une string
      assert.strictEqual(typeof decoded.refreshId, "string");
      // - refreshId ne doit pas être vide
      assert(decoded.refreshId.length > 0);
      // 💡 Cet ID sera stocké en DB pour valider le token lors du refresh
    });

    it("should have 'refresh' audience", () => {
      // ACT : Générer les tokens et décoder
      const tokens = generateAuthTokens(mockUser);
      const decoded = jwt.verify(tokens.refreshToken.token, config.jwtSecret) as any;

      // ASSERT : Vérifier l'audience
      // Audience = "refresh" signifie que ce token est SEULEMENT pour les refreshes
      // Si quelqu'un essaie d'utiliser un refreshToken comme accessToken, ça échouera
      assert.strictEqual(decoded.aud, "refresh");
    });

    it("should NOT contain userId or role", () => {
      // ACT : Générer les tokens et décoder
      const tokens = generateAuthTokens(mockUser);
      const decoded = jwt.verify(tokens.refreshToken.token, config.jwtSecret) as any;

      // ASSERT : S'assurer que userId et role ne sont PAS présents
      // ✅ Sécurité : Si quelqu'un vole un refreshToken, il ne peut pas prétendre être un autre user
      // ✅ Sécurité : Si quelqu'un vole un refreshToken, il ne peut pas changer les permissions
      assert(!decoded.userId, "userId should NOT be in refresh token");
      assert(!decoded.role, "role should NOT be in refresh token");
    });

    it("should expire in 7 days", () => {
      // ACT : Générer les tokens et décoder
      const tokens = generateAuthTokens(mockUser);
      const decoded = jwt.verify(tokens.refreshToken.token, config.jwtSecret) as any;

      // ASSERT : Vérifier que l'expiration est correcte
      const now = Math.floor(Date.now() / 1000);
      const expiresIn = decoded.exp - now; // Temps restant en secondes
      const sevenDaysInSeconds = 7 * 24 * 60 * 60; // 604800 secondes
      // Devrait être ~7 jours
      // On tolère 1 seconde de variance
      assert(expiresIn >= sevenDaysInSeconds - 1 && expiresIn <= sevenDaysInSeconds + 1);
    });

    it("should generate unique refreshId on each call", () => {
      // ACT : Générer deux sets de tokens et comparer les refreshIds
      const tokens1 = generateAuthTokens(mockUser);
      const tokens2 = generateAuthTokens(mockUser);
      const decoded1 = jwt.verify(tokens1.refreshToken.token, config.jwtSecret) as any;
      const decoded2 = jwt.verify(tokens2.refreshToken.token, config.jwtSecret) as any;

      // ASSERT : Les deux refreshIds doivent être DIFFÉRENTS
      // ✅ Sécurité critique : Si les refreshIds étaient identiques,
      //    on pourrait réutiliser un ancien refreshToken
      // Le "crypto.randomBytes" dans la fonction garantit l'unicité
      assert.notStrictEqual(
        decoded1.refreshId,
        decoded2.refreshId,
        "refreshId should be different for each token generation"
      );
    });
  });

  /**
   * Tests de sécurité cryptographique
   * Vérifie que les tokens sont correctement signés et validés
   * C'est la base de la sécurité JWT
   */
  describe("Token Signing", () => {
    it("should be signed with jwtSecret", () => {
      // ACT : Générer les tokens
      const tokens = generateAuthTokens(mockUser);

      // ASSERT : Vérifier que les tokens peuvent être décodés avec le secret
      // ✅ Si la signature est correcte, jwt.verify() ne lance pas d'erreur
      // ✅ Si la signature est incorrecte, jwt.verify() lance une erreur
      assert.doesNotThrow(() => {
        // Vérifier l'accessToken
        jwt.verify(tokens.accessToken.token, config.jwtSecret);
        // Vérifier le refreshToken
        jwt.verify(tokens.refreshToken.token, config.jwtSecret);
      });
    });

    it("should fail verification with wrong secret", () => {
      // ACT : Générer les tokens
      const tokens = generateAuthTokens(mockUser);

      // ASSERT : Vérifier que la vérification échoue avec un secret différent
      // ✅ Sécurité : Un attaquant qui ne connaît pas le secret ne peut pas créer de faux tokens
      // ✅ Sécurité : Un token modifié ne passera pas la vérification
      assert.throws(() => {
        jwt.verify(tokens.accessToken.token, "wrong-secret");
      });
    });
  });

  /**
   * Tests des cas limites et variables
   * S'assure que la fonction gère correctement différentes valeurs
   */
  describe("Edge Cases", () => {
    it("should handle user with role 0", () => {
      // ARRANGE : Créer un utilisateur avec roleId = 0
      // ⚠️ Important : roleId = 0 est une valeur "falsy" en JavaScript
      // Il faut tester que le token le gère correctement (ne le traite pas comme false)
      const userWithRoleZero = { ...mockUser, roleId: 0 };

      // ACT : Générer les tokens
      const tokens = generateAuthTokens(userWithRoleZero);
      const decoded = jwt.verify(tokens.accessToken.token, config.jwtSecret) as any;

      // ASSERT : Vérifier que role 0 est bien présent dans le token
      // (et pas remplacé par false, undefined, ou autre)
      assert.strictEqual(decoded.role, 0);
    });

    it("should handle user with high roleId", () => {
      // ARRANGE : Créer un utilisateur avec un roleId très haut (999)
      // Teste que la fonction ne a pas de limite de taille pour les rôles
      const userWithHighRole = { ...mockUser, roleId: 999 };

      // ACT : Générer les tokens
      const tokens = generateAuthTokens(userWithHighRole);
      const decoded = jwt.verify(tokens.accessToken.token, config.jwtSecret) as any;

      // ASSERT : Vérifier que le roleId haut est bien préservé
      assert.strictEqual(decoded.role, 999);
    });
  });
});
