import { describe, it } from "node:test";
import assert from "node:assert";
import {
  HttpClientError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} from "./errors";

/**
 * Suite de tests pour les classes d'erreur HTTP
 * ============================================
 * But : Vérifier que chaque classe d'erreur :
 *   1. A le bon status code HTTP
 *   2. A le bon nom de classe
 *   3. Préserve le message d'erreur
 *   4. Hérite correctement de HttpClientError et Error
 */
describe("Error Classes", () => {
  /**
   * Tests pour la classe de base HttpClientError
   * Vérifie l'implémentation du constructeur parent
   */
  describe("HttpClientError", () => {
    it("should set name and status correctly", () => {
      // ARRANGE : Créer une erreur HTTP avec un message et un status
      const error = new HttpClientError("Test error", { status: 500 });

      // ASSERT : Vérifier que les propriétés sont bien définies
      // - Le name doit être le nom de la classe (pour les logs/debugging)
      assert.strictEqual(error.name, "HttpClientError");
      // - Le status doit être exactement 500
      assert.strictEqual(error.status, 500);
      // - Le message doit être préservé
      assert.strictEqual(error.message, "Test error");
    });
  });

  /**
   * Tests pour BadRequestError (400)
   * Cas d'usage : Validation échouée, données mal formées
   */
  describe("BadRequestError", () => {
    it("should have status 400", () => {
      // ARRANGE : Créer une BadRequestError
      const error = new BadRequestError("Invalid request");

      // ASSERT : Vérifier les 3 propriétés critiques
      // - Status HTTP 400 = "Bad Request"
      assert.strictEqual(error.status, 400);
      // - Nom de classe correct pour logging
      assert.strictEqual(error.name, "BadRequestError");
      // - Message d'erreur préservé pour l'utilisateur
      assert.strictEqual(error.message, "Invalid request");
    });
  });

  /**
   * Tests pour UnauthorizedError (401)
   * Cas d'usage : Token manquant, token expiré, credentials incorrects
   */
  describe("UnauthorizedError", () => {
    it("should have status 401", () => {
      // ARRANGE : Créer une UnauthorizedError
      const error = new UnauthorizedError("Token missing");

      // ASSERT : Vérifier le status et le nom
      // - Status HTTP 401 = "Unauthorized" (authentification échouée)
      assert.strictEqual(error.status, 401);
      // - Nom de classe correct
      assert.strictEqual(error.name, "UnauthorizedError");
    });
  });

  /**
   * Tests pour ForbiddenError (403)
   * Cas d'usage : Utilisateur authentifié mais sans permission
   */
  describe("ForbiddenError", () => {
    it("should have status 403", () => {
      // ARRANGE : Créer une ForbiddenError
      const error = new ForbiddenError("Access denied");

      // ASSERT : Vérifier le status et le nom
      // - Status HTTP 403 = "Forbidden" (autorisé mais pas d'accès)
      assert.strictEqual(error.status, 403);
      // - Nom de classe correct
      assert.strictEqual(error.name, "ForbiddenError");
    });
  });

  /**
   * Tests pour NotFoundError (404)
   * Cas d'usage : Ressource non trouvée en DB
   */
  describe("NotFoundError", () => {
    it("should have status 404", () => {
      // ARRANGE : Créer une NotFoundError
      const error = new NotFoundError("Resource not found");

      // ASSERT : Vérifier le status et le nom
      // - Status HTTP 404 = "Not Found"
      assert.strictEqual(error.status, 404);
      // - Nom de classe correct
      assert.strictEqual(error.name, "NotFoundError");
    });
  });

  /**
   * Tests pour ConflictError (409)
   * Cas d'usage : Violation de contrainte unique (email déjà existant, etc)
   */
  describe("ConflictError", () => {
    it("should have status 409", () => {
      // ARRANGE : Créer une ConflictError
      const error = new ConflictError("Duplicate entry");

      // ASSERT : Vérifier le status et le nom
      // - Status HTTP 409 = "Conflict" (ressource déjà existe)
      assert.strictEqual(error.status, 409);
      // - Nom de classe correct
      assert.strictEqual(error.name, "ConflictError");
    });
  });

  /**
   * Tests d'héritage
   * Vérifie que les classes d'erreur héritent correctement de Error
   * Ceci est important pour :
   *   - La gestion des erreurs (try/catch)
   *   - La détection du type d'erreur
   *   - La compatibilité avec les outils standard
   */
  describe("Error instanceof checks", () => {
    it("should be instanceof Error", () => {
      // ARRANGE : Créer une BadRequestError
      const error = new BadRequestError("test");

      // ASSERT : Vérifier l'héritage en cascade
      // - Doit être une instance d'Error (classe native)
      assert(error instanceof Error);
      // - Doit être une instance de BadRequestError
      assert(error instanceof BadRequestError);
      // - Doit être une instance de HttpClientError (parent)
      assert(error instanceof HttpClientError);

      // ✅ Cela signifie que la chaîne d'héritage fonctionne correctement :
      // Error → HttpClientError → BadRequestError
    });
  });
});
