import argon2 from "argon2";

import { prisma } from "./client_seeding";

async function seed() {
  const existing = await prisma.role.findFirst();
  if (existing) {
    console.log("Base de données déjà peuplée — seeding ignoré.");
    await prisma.$disconnect();
    return;
  }

  const roles = await prisma.role.createMany({
    data: [
      { name: "student", frName: "Etudiant" },
      { name: "instructor", frName: "Formateur" },
      { name: "admin", frName: "Administrateur" },
    ],
  });

  console.log("Start seeding ->");
  const users = await prisma.user.createMany({
    data: [
      {
        email: "test@test.test",
        firstname: "Test",
        lastname: "Admin",
        pseudo: "admin",
        password: await argon2.hash("test"),
        roleId: 3,
        verified: true,
      },
      {
        email: "samed@celik.oclock",
        firstname: "Samed",
        lastname: "Celik",
        pseudo: "TheKingOfLyon",
        password: await argon2.hash("samed"),
        roleId: 1,
        verified: true,
      },
      {
        email: "jacques@duchamplecheval.oclock",
        firstname: "Jacques",
        lastname: "Cheval",
        pseudo: "President",
        password: await argon2.hash("jacques"),
        roleId: 1,
        verified: true,
      },
      {
        email: "loic@leger.oclock",
        firstname: "Loic",
        lastname: "Leger",
        pseudo: "GifMaster",
        password: await argon2.hash("loic"),
        roleId: 2,
        verified: true,
      },
      {
        email: "adrien@poncet.oclock",
        firstname: "Adrien",
        lastname: "Poncet",
        pseudo: "DreadMaster",
        password: await argon2.hash("adrien"),
        roleId: 2,
        verified: true,
      },
      {
        email: "maria@artisan.oclock",
        firstname: "Maria",
        lastname: "Artisan",
        pseudo: "MariaDIY",
        password: await argon2.hash("maria"),
        roleId: 1,
        verified: true,
      },
      {
        email: "nina@atelier.oclock",
        firstname: "Nina",
        lastname: "Atelier",
        pseudo: "NinaNail",
        password: await argon2.hash("nina"),
        roleId: 1,
        verified: true,
      },
      {
        email: "marc@bricoleur.oclock",
        firstname: "Marc",
        lastname: "Bricoleur",
        pseudo: "MarcPro",
        password: await argon2.hash("marc"),
        roleId: 2,
        verified: true,
      },
      {
        email: "alice@brico.oclock",
        firstname: "Alice",
        lastname: "Brico",
        pseudo: "AliceFix",
        password: await argon2.hash("alice"),
        roleId: 1,
        verified: true,
      },
      {
        email: "bob@maker.oclock",
        firstname: "Bob",
        lastname: "Maker",
        pseudo: "BobMaker",
        password: await argon2.hash("bob"),
        roleId: 1,
        verified: true,
      },
    ],
  });
  console.log("Users :", users.count);

  const categories = await prisma.category.createMany({
    data: [
      {
        name: "Menuiserie",
        description: "Travail du bois, assemblage et finition.",
        borderColor: "#C0DD97",
        textColor: "#27500A",
        backgroundColor: "#EAF3DE",
      },
      {
        name: "Plomberie",
        description: "Installations d'eau, robinetterie et évacuation.",
        borderColor: "#B5D4F4",
        textColor: "#1D4E89",
        backgroundColor: "#EBF2FA",
      },
      {
        name: "Electricité",
        description: "Montage de circuits, interrupteurs et prises.",
        borderColor: "#FAC775",
        textColor: "#BA7517",
        backgroundColor: "#FEF5E7",
      },
      {
        name: "Chauffage",
        description: "Entretien, purge et installation de radiateurs.",
        borderColor: "#D7BDE2",
        textColor: "#7D3C98",
        backgroundColor: "#F4ECF7",
      },
      {
        name: "Carrelage",
        description: "Pose de carrelage, joints et préparation des surfaces.",
        borderColor: "#F1948A",
        textColor: "#A93226",
        backgroundColor: "#FDEDEC",
      },
      {
        name: "Peinture",
        description: "Préparation des murs, choix de couleurs et application.",
        borderColor: "#D6D3D1",
        textColor: "#57534E",
        backgroundColor: "#F5F5F4",
      },
    ],
  });
  console.log("Categories :", categories.count);

  const learningObjectives = await prisma.learningObjective.createMany({
    data: [
      { title: "Couper l'arrivée d'eau en sécurité" },
      { title: "Démonter l'ancien robinet" },
      { title: "Raccorder les flexibles" },
      { title: "Tester et contrôler les fuites" },
      { title: "Mesurer et tracer une étagère droite" },
      { title: "Choisir la bonne visserie pour le bois" },
      { title: "Vérifier l'isolement d'un fil électrique" },
      { title: "Changer un interrupteur sans danger" },
      { title: "Purger un radiateur efficacement" },
      { title: "Préparer un mur avant peinture" },
      { title: "Appliquer un mortier-colle régulier" },
      { title: "Poser une première rangée de carrelage" },
      { title: "Assembler des planches de bois" },
      { title: "Finition et ponçage du bois" },
      { title: "Installer une prise électrique" },
      { title: "Réparer une fuite d'eau" },
      { title: "Changer un radiateur" },
      { title: "Appliquer une couche de peinture" },
      { title: "Poser du parquet flottant" },
      { title: "Réparer une porte qui grince" },
      { title: "Installer un WC suspendu" },
      { title: "Changer un fusible" },
      { title: "Isoler un mur" },
      { title: "Poser du papier peint" },
      { title: "Réparer une fuite de toit" },
      { title: "Installer une douche" },
      { title: "Changer une ampoule" },
      { title: "Nettoyer un conduit de cheminée" },
      { title: "Poser une moquette" },
      { title: "Réparer une serrure" },
      { title: "Installer un lave-linge" },
    ],
  });
  console.log("LearningObjectives :", learningObjectives.count);

  const tools = await prisma.tool.createMany({
    data: [
      { name: "Clé à molette", description: "Pour serrer ou desserrer raccords et écrous." },
      { name: "Téflon", description: "Ruban d'étanchéité pour filetages de plomberie." },
      { name: "Flexibles", description: "Tuyaux souples pour raccordement d'eau." },
      { name: "Coupelle", description: "Pièce de raccordement pour siphon." },
      { name: "Tournevis plat", description: "Outil de base pour vis et interrupteurs." },
      { name: "Tournevis cruciforme", description: "Indispensable pour fixations et mécanismes." },
      { name: "Niveau à bulle", description: "Permet d'aligner les éléments horizontaux." },
      { name: "Mètre ruban", description: "Précision de mesure pour découpe et pose." },
      { name: "Spatule crantée", description: "Pour étaler le mortier-colle uniformément." },
      { name: "Rouleau de peinture", description: "Pour appliquer la peinture rapidement." },
      { name: "Pince coupante", description: "Pour couper câbles et gaines." },
      { name: "Pistolet à mastic", description: "Pour joints étanches autour des installations." },
      { name: "Scie à bois", description: "Pour couper le bois avec précision." },
      { name: "Marteau", description: "Outil essentiel pour clouer et assembler." },
      { name: "Perceuse", description: "Pour percer des trous dans le bois ou le mur." },
      { name: "Ponceuse", description: "Pour lisser les surfaces en bois." },
      { name: "Multimètre", description: "Pour mesurer la tension et l'intensité." },
      { name: "Pince à dénuder", description: "Pour retirer l'isolant des fils." },
      { name: "Clé anglaise", description: "Pour serrer les écrous de plomberie." },
      { name: "Tuyau d'arrosage", description: "Pour tester les installations d'eau." },
      { name: "Brosse à radiateur", description: "Pour nettoyer les radiateurs." },
      { name: "Papier de verre", description: "Pour poncer les surfaces." },
      { name: "Cutter", description: "Pour couper les matériaux souples." },
      { name: "Échelle", description: "Pour accéder aux hauteurs." },
      { name: "Gants de protection", description: "Pour se protéger les mains." },
      { name: "Lunettes de sécurité", description: "Pour protéger les yeux." },
      { name: "Masque", description: "Pour éviter l'inhalation de poussières." },
      { name: "Bande adhésive", description: "Pour fixer temporairement." },
      { name: "Colle à bois", description: "Pour assembler les pièces de bois." },
      { name: "Vernis", description: "Pour protéger et finir le bois." },
    ],
  });
  console.log("Tools :", tools.count);

  const courses = await prisma.cours.createMany({
    data: [
      // Menuiserie (5 cours)
      {
        title: "Poser une étagère murale en bois",
        slug: "poser-une-etagere-murale-en-bois",
        littleSummary: "Apprenez à fixer une étagère droite, stable et adaptée à votre mur.",
        summary: "Ce cours vous guide du choix des matériaux à la fixation finale d'une étagère murale. Vous verrez comment mesurer, percer, choisir des chevilles adaptées et fixer le support de manière propre.",
        difficulty: 2,
        authorId: 4,
        categoryId: 1,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Assembler une étagère en kit",
        slug: "assembler-une-etagere-en-kit",
        littleSummary: "Montez facilement une étagère pré-découpée.",
        summary: "Ce tutoriel montre comment assembler une étagère en kit avec des vis et des chevilles, en respectant les instructions pour une stabilité parfaite.",
        difficulty: 1,
        authorId: 4,
        categoryId: 1,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Réparer une porte qui grince",
        slug: "reparer-une-porte-qui-grince",
        littleSummary: "Éliminez les grincements de porte en quelques gestes.",
        summary: "Découvrez comment identifier la cause du grincement et appliquer la solution appropriée, comme lubrifier les gonds ou ajuster la porte.",
        difficulty: 2,
        authorId: 4,
        categoryId: 1,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Poser du parquet flottant",
        slug: "poser-du-parquet-flottant",
        littleSummary: "Installez un parquet sans colle ni clous.",
        summary: "Apprenez à poser un parquet flottant sur un sol préparé, en veillant à l'expansion et à l'alignement pour un résultat professionnel.",
        difficulty: 3,
        authorId: 4,
        categoryId: 1,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Fabriquer une boîte de rangement",
        slug: "fabriquer-une-boite-de-rangement",
        littleSummary: "Créez votre propre boîte en bois pour organiser.",
        summary: "Ce cours enseigne la découpe, l'assemblage et la finition d'une boîte de rangement simple, idéale pour débutants en menuiserie.",
        difficulty: 3,
        authorId: 4,
        categoryId: 1,
        numberPage: 4,
        visibility:true
      },
      // Plomberie (5 cours)
      {
        title: "Installer un siphon de lavabo",
        slug: "installer-un-siphon-de-lavabo",
        littleSummary: "Remplacez un siphon en évitant les fuites et en respectant l'écoulement.",
        summary: "Ce cours de plomberie détaille la dépose de l'ancien siphon, le choix du bon modèle et le montage correct des joints pour une installation durable sans odeurs ni fuites.",
        difficulty: 3,
        authorId: 5,
        categoryId: 2,
        numberPage: 4,visibility:true
      },
      {
        title: "Réparer une fuite d'eau",
        slug: "reparer-une-fuite-d-eau",
        littleSummary: "Stoppez une fuite rapidement et efficacement.",
        summary: "Identifiez le type de fuite, coupez l'eau et appliquez la réparation appropriée, comme changer un joint ou resserrer un raccord.",
        difficulty: 2,
        authorId: 5,
        categoryId: 2,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Installer un WC suspendu",
        slug: "installer-un-wc-suspendu",
        littleSummary: "Montez un WC moderne et design.",
        summary: "Ce guide explique l'installation d'un WC suspendu, de la fixation de la plaque au raccordement des eaux, en toute sécurité.",
        difficulty: 4,
        authorId: 5,
        categoryId: 2,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Changer un robinet de douche",
        slug: "changer-un-robinet-de-douche",
        littleSummary: "Remplacez votre robinet de douche usé.",
        summary: "Apprenez à démonter l'ancien robinet, choisir le nouveau modèle et le raccorder correctement pour une douche fonctionnelle.",
        difficulty: 3,
        authorId: 5,
        categoryId: 2,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Installer une douche",
        slug: "installer-une-douche",
        littleSummary: "Posez une douche complète dans votre salle de bain.",
        summary: "De la préparation du sol à l'installation du receveur, ce cours couvre tous les aspects pour une douche étanche et pratique.",
        difficulty: 4,
        authorId: 5,
        categoryId: 2,
        numberPage: 4,
        visibility:true
      },
      // Electricité (5 cours)
      {
        title: "Changer un interrupteur simple",
        slug: "changer-un-interrupteur-simple",
        littleSummary: "Apprenez à remplacer un interrupteur en toute sécurité.",
        summary: "Vous découvrirez comment couper le circuit, identifier les fils, retirer l'ancien interrupteur et poser un nouveau modèle sans risque électrique.",
        difficulty: 3,
        authorId: 5,
        categoryId: 3,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Installer une prise électrique",
        slug: "installer-une-prise-electrique",
        littleSummary: "Ajoutez une prise de courant en toute sécurité.",
        summary: "Ce cours explique comment percer le mur, tirer les câbles et monter une prise électrique conforme aux normes.",
        difficulty: 4,
        authorId: 5,
        categoryId: 3,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Changer un fusible",
        slug: "changer-un-fusible",
        littleSummary: "Remplacez un fusible grillé simplement.",
        summary: "Apprenez à identifier le fusible défaillant, le retirer et installer un nouveau fusible de la bonne intensité.",
        difficulty: 2,
        authorId: 5,
        categoryId: 3,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Changer une ampoule",
        slug: "changer-une-ampoule",
        littleSummary: "Remplacez une ampoule grillée en quelques secondes.",
        summary: "Ce tutoriel rapide montre comment dévisser l'ancienne ampoule et visser la nouvelle, en respectant les types d'ampoules.",
        difficulty: 1,
        authorId: 5,
        categoryId: 3,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Installer un détecteur de fumée",
        slug: "installer-un-detecteur-de-fumee",
        littleSummary: "Protégez votre maison avec un détecteur de fumée.",
        summary: "Découvrez comment choisir et installer un détecteur de fumée au plafond, en le reliant au circuit électrique si nécessaire.",
        difficulty: 2,
        authorId: 5,
        categoryId: 3,
        numberPage: 4,
        visibility:true
      },
      // Chauffage (5 cours)
      {
        title: "Purger un radiateur à eau",
        slug: "purger-un-radiateur-a-eau",
        littleSummary: "Nettoyez vos radiateurs pour améliorer la chaleur et réduire le bruit.",
        summary: "Ce cours montre la procédure complète pour purger un radiateur à eau, vérifier la pression et rétablir un rendement optimal de votre chauffage central.",
        difficulty: 2,
        authorId: 8,
        categoryId: 4,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Changer un radiateur",
        slug: "changer-un-radiateur",
        littleSummary: "Remplacez un vieux radiateur par un modèle moderne.",
        summary: "Apprenez à vidanger le circuit, démonter l'ancien radiateur et installer le nouveau, en purgeant et testant le système.",
        difficulty: 4,
        authorId: 8,
        categoryId: 4,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Nettoyer un conduit de cheminée",
        slug: "nettoyer-un-conduit-de-cheminee",
        littleSummary: "Assurez la sécurité et l'efficacité de votre cheminée.",
        summary: "Ce cours explique comment nettoyer les dépôts de suie dans un conduit de cheminée pour éviter les risques d'incendie.",
        difficulty: 3,
        authorId: 8,
        categoryId: 4,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Installer un thermostat programmable",
        slug: "installer-un-thermostat-programmable",
        littleSummary: "Contrôlez votre chauffage intelligemment.",
        summary: "Découvrez comment remplacer votre thermostat ancien par un modèle programmable pour économiser de l'énergie.",
        difficulty: 3,
        authorId: 8,
        categoryId: 4,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Isoler un mur intérieur",
        slug: "isoler-un-mur-interieur",
        littleSummary: "Améliorez l'isolation thermique de votre maison.",
        summary: "Ce tutoriel montre comment poser de l'isolant sur un mur intérieur pour réduire les pertes de chaleur.",
        difficulty: 3,
        authorId: 8,
        categoryId: 4,
        numberPage: 4,
        visibility:true
      },
      // Carrelage (5 cours)
      {
        title: "Poser une faïence murale",
        slug: "poser-une-faience-murale",
        littleSummary: "Posez une faïence propre et régulière dans votre salle de bain ou cuisine.",
        summary: "Ce cours de carrelage vous accompagne de la préparation du mur à la réalisation des joints, avec les bons gestes pour un mur esthétique et durable.",
        difficulty: 4,
        authorId: 8,
        categoryId: 5,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Poser du carrelage au sol",
        slug: "poser-du-carrelage-au-sol",
        littleSummary: "Installez un carrelage résistant sur votre sol.",
        summary: "Apprenez à préparer le sol, étaler le mortier et poser les carreaux avec des joints réguliers pour un sol durable.",
        difficulty: 4,
        authorId: 8,
        categoryId: 5,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Réparer une fissure dans le carrelage",
        slug: "reparer-une-fissure-dans-le-carrelage",
        littleSummary: "Réparez une fissure sans remplacer le carreau.",
        summary: "Ce cours montre comment reboucher une fissure dans un carreau de carrelage avec du mastic adapté.",
        difficulty: 2,
        authorId: 8,
        categoryId: 5,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Poser une moquette",
        slug: "poser-une-moquette",
        littleSummary: "Installez une moquette douce et isolante.",
        summary: "Découvrez comment préparer le sol, couper la moquette et la fixer pour un revêtement de sol confortable.",
        difficulty: 3,
        authorId: 8,
        categoryId: 5,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Changer un carreau de carrelage",
        slug: "changer-un-carreau-de-carrelage",
        littleSummary: "Remplacez un carreau cassé facilement.",
        summary: "Apprenez à retirer l'ancien carreau, préparer la surface et poser un nouveau carreau avec des joints invisibles.",
        difficulty: 3,
        authorId: 8,
        categoryId: 5,
        numberPage: 4,
        visibility:true
      },
      // Peinture (5 cours)
      {
        title: "Préparer et peindre un mur",
        slug: "preparer-et-peindre-un-mur",
        littleSummary: "Préparation du support, sous-couche et application de la peinture.",
        summary: "Dans ce cours de peinture, vous apprendrez à préparer un mur abîmé, appliquer une sous-couche et finir proprement avec un rouleau et un pinceau.",
        difficulty: 2,
        authorId: 4,
        categoryId: 6,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Poser du papier peint",
        slug: "poser-du-papier-peint",
        littleSummary: "Habillez vos murs avec du papier peint.",
        summary: "Ce tutoriel explique comment préparer le mur, couper le papier et le coller pour un résultat sans bulles.",
        difficulty: 3,
        authorId: 4,
        categoryId: 6,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Peindre une porte",
        slug: "peindre-une-porte",
        littleSummary: "Redonnez vie à une porte avec de la peinture.",
        summary: "Apprenez à poncer, masquer et peindre une porte en bois pour un fini lisse et durable.",
        difficulty: 2,
        authorId: 4,
        categoryId: 6,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Appliquer une peinture décorative",
        slug: "appliquer-une-peinture-decorative",
        littleSummary: "Créez des effets décoratifs sur vos murs.",
        summary: "Découvrez les techniques pour appliquer des peintures texturées ou à effets pour personnaliser vos intérieurs.",
        difficulty: 4,
        authorId: 4,
        categoryId: 6,
        numberPage: 4,
        visibility:true
      },
      {
        title: "Peindre un plafond",
        slug: "peindre-un-plafond",
        littleSummary: "Rafraîchissez votre plafond sans taches.",
        summary: "Ce cours montre comment préparer et peindre un plafond avec un rouleau adapté pour éviter les coulures.",
        difficulty: 3,
        authorId: 4,
        categoryId: 6,
        numberPage: 4,
        visibility:true
      },
    ],
  });
  console.log("Courses :", courses.count);

  
  // Liens outils et objectifs pour chaque cours (simplifié pour l'exemple)
  await prisma.coursHasTool.createMany({
    data: [
      // Menuiserie
      { coursId: 1, toolsId: 7 }, { coursId: 1, toolsId: 8 }, { coursId: 1, toolsId: 1 }, { coursId: 1, toolsId: 6 },
      { coursId: 2, toolsId: 5 }, { coursId: 2, toolsId: 6 }, { coursId: 2, toolsId: 14 }, { coursId: 2, toolsId: 15 },
      { coursId: 3, toolsId: 5 }, { coursId: 3, toolsId: 12 }, { coursId: 3, toolsId: 7 },
      { coursId: 4, toolsId: 8 }, { coursId: 4, toolsId: 13 }, { coursId: 4, toolsId: 7 }, { coursId: 4, toolsId: 22 },
      { coursId: 5, toolsId: 13 }, { coursId: 5, toolsId: 14 }, { coursId: 5, toolsId: 15 }, { coursId: 5, toolsId: 16 },
      // Plomberie
      { coursId: 6, toolsId: 1 }, { coursId: 6, toolsId: 2 }, { coursId: 6, toolsId: 3 }, { coursId: 6, toolsId: 4 },
      { coursId: 7, toolsId: 1 }, { coursId: 7, toolsId: 2 }, { coursId: 7, toolsId: 19 }, { coursId: 7, toolsId: 20 },
      { coursId: 8, toolsId: 1 }, { coursId: 8, toolsId: 2 }, { coursId: 8, toolsId: 3 }, { coursId: 8, toolsId: 7 },
      { coursId: 9, toolsId: 1 }, { coursId: 9, toolsId: 2 }, { coursId: 9, toolsId: 3 }, { coursId: 9, toolsId: 4 },
      { coursId: 10, toolsId: 1 }, { coursId: 10, toolsId: 2 }, { coursId: 10, toolsId: 3 }, { coursId: 10, toolsId: 9 },
      // Electricité
      { coursId: 11, toolsId: 5 }, { coursId: 11, toolsId: 6 }, { coursId: 11, toolsId: 10 }, { coursId: 11, toolsId: 11 },
      { coursId: 12, toolsId: 5 }, { coursId: 12, toolsId: 6 }, { coursId: 12, toolsId: 11 }, { coursId: 12, toolsId: 17 },
      { coursId: 13, toolsId: 5 }, { coursId: 13, toolsId: 6 }, { coursId: 13, toolsId: 17 },
      { coursId: 14, toolsId: 24 }, // échelle pour ampoule
      { coursId: 15, toolsId: 5 }, { coursId: 15, toolsId: 6 }, { coursId: 15, toolsId: 11 },
      // Chauffage
      { coursId: 16, toolsId: 1 }, { coursId: 16, toolsId: 12 }, { coursId: 16, toolsId: 7 },
      { coursId: 17, toolsId: 1 }, { coursId: 17, toolsId: 2 }, { coursId: 17, toolsId: 3 }, { coursId: 17, toolsId: 7 },
      { coursId: 18, toolsId: 21 }, { coursId: 18, toolsId: 24 },
      { coursId: 19, toolsId: 5 }, { coursId: 19, toolsId: 6 }, { coursId: 19, toolsId: 11 },
      { coursId: 20, toolsId: 22 }, { coursId: 20, toolsId: 23 }, { coursId: 20, toolsId: 7 },
      // Carrelage
      { coursId: 21, toolsId: 8 }, { coursId: 21, toolsId: 9 }, { coursId: 21, toolsId: 7 },
      { coursId: 22, toolsId: 8 }, { coursId: 22, toolsId: 9 }, { coursId: 22, toolsId: 7 }, { coursId: 22, toolsId: 22 },
      { coursId: 23, toolsId: 12 }, { coursId: 23, toolsId: 22 },
      { coursId: 24, toolsId: 8 }, { coursId: 24, toolsId: 23 }, { coursId: 24, toolsId: 7 },
      { coursId: 25, toolsId: 8 }, { coursId: 25, toolsId: 9 }, { coursId: 25, toolsId: 12 }, { coursId: 25, toolsId: 7 },
      // Peinture
      { coursId: 26, toolsId: 10 }, { coursId: 26, toolsId: 9 }, { coursId: 26, toolsId: 7 }, { coursId: 26, toolsId: 5 },
      { coursId: 27, toolsId: 8 }, { coursId: 27, toolsId: 23 }, { coursId: 27, toolsId: 7 },
      { coursId: 28, toolsId: 10 }, { coursId: 28, toolsId: 22 }, { coursId: 28, toolsId: 7 },
      { coursId: 29, toolsId: 10 }, { coursId: 29, toolsId: 9 }, { coursId: 29, toolsId: 7 },
      { coursId: 30, toolsId: 10 }, { coursId: 30, toolsId: 9 }, { coursId: 30, toolsId: 24 },
    ],
  });
  
  await prisma.coursHasLearningObjective.createMany({
    data: [
      // Menuiserie
      { coursId: 1, learningObjectiveId: 5 }, { coursId: 1, learningObjectiveId: 6 }, { coursId: 1, learningObjectiveId: 7 },
      { coursId: 2, learningObjectiveId: 13 }, { coursId: 2, learningObjectiveId: 6 },
      { coursId: 3, learningObjectiveId: 20 }, { coursId: 3, learningObjectiveId: 14 },
      { coursId: 4, learningObjectiveId: 19 }, { coursId: 4, learningObjectiveId: 6 },
      { coursId: 5, learningObjectiveId: 13 }, { coursId: 5, learningObjectiveId: 14 },
      // Plomberie
      { coursId: 6, learningObjectiveId: 1 }, { coursId: 6, learningObjectiveId: 2 }, { coursId: 6, learningObjectiveId: 3 }, { coursId: 6, learningObjectiveId: 4 },
      { coursId: 7, learningObjectiveId: 16 }, { coursId: 7, learningObjectiveId: 4 },
      { coursId: 8, learningObjectiveId: 21 }, { coursId: 8, learningObjectiveId: 3 },
      { coursId: 9, learningObjectiveId: 2 }, { coursId: 9, learningObjectiveId: 3 }, { coursId: 9, learningObjectiveId: 4 },
      { coursId: 10, learningObjectiveId: 26 }, { coursId: 10, learningObjectiveId: 3 },
      // Electricité
      { coursId: 11, learningObjectiveId: 7 }, { coursId: 11, learningObjectiveId: 8 },
      { coursId: 12, learningObjectiveId: 15 }, { coursId: 12, learningObjectiveId: 7 },
      { coursId: 13, learningObjectiveId: 22 }, { coursId: 13, learningObjectiveId: 7 },
      { coursId: 14, learningObjectiveId: 27 }, { coursId: 14, learningObjectiveId: 7 },
      { coursId: 15, learningObjectiveId: 7 }, { coursId: 15, learningObjectiveId: 8 },
      // Chauffage
      { coursId: 16, learningObjectiveId: 9 }, { coursId: 16, learningObjectiveId: 4 },
      { coursId: 17, learningObjectiveId: 17 }, { coursId: 17, learningObjectiveId: 9 },
      { coursId: 18, learningObjectiveId: 28 }, { coursId: 18, learningObjectiveId: 9 },
      { coursId: 19, learningObjectiveId: 7 }, { coursId: 19, learningObjectiveId: 8 },
      { coursId: 20, learningObjectiveId: 23 }, { coursId: 20, learningObjectiveId: 10 },
      // Carrelage
      { coursId: 21, learningObjectiveId: 11 }, { coursId: 21, learningObjectiveId: 12 },
      { coursId: 22, learningObjectiveId: 11 }, { coursId: 22, learningObjectiveId: 12 },
      { coursId: 23, learningObjectiveId: 12 }, { coursId: 23, learningObjectiveId: 6 },
      { coursId: 24, learningObjectiveId: 29 }, { coursId: 24, learningObjectiveId: 6 },
      { coursId: 25, learningObjectiveId: 12 }, { coursId: 25, learningObjectiveId: 6 },
      // Peinture
      { coursId: 26, learningObjectiveId: 10 }, { coursId: 26, learningObjectiveId: 18 },
      { coursId: 27, learningObjectiveId: 24 }, { coursId: 27, learningObjectiveId: 10 },
      { coursId: 28, learningObjectiveId: 18 }, { coursId: 28, learningObjectiveId: 10 },
      { coursId: 29, learningObjectiveId: 18 }, { coursId: 29, learningObjectiveId: 10 },
      { coursId: 30, learningObjectiveId: 18 }, { coursId: 30, learningObjectiveId: 10 },
    ],
  });
  
  // Contenus pour chaque cours (4 pages chacun en Markdown)
  const coursContents = await prisma.coursContent.createMany({
    data: [
      // Cours 1: Poser une étagère murale en bois
      {
        content: "# Introduction\n\nCe cours présente les bonnes pratiques pour poser une étagère murale en bois de manière droite, stable et durable.",
        numberPage: 1,
        coursId: 1,
      },
      {
        content: "# Mesurer et tracer\n\nRepérez l'emplacement de l'étagère, mesurez deux points alignés et marquez-les avec précision avant de percer.",
        numberPage: 2,
        coursId: 1,
      },
      {
        content: "# Fixer les supports\n\nChoisissez des chevilles adaptées au type de mur, posez les supports et vérifiez l'horizontalité avec un niveau.",
        numberPage: 3,
        coursId: 1,
      },
      {
        content: "# Poser l'étagère\n\nPositionnez votre étagère, serrez les vis et contrôlez la stabilité finale avant d'y déposer des objets.",
        numberPage: 4,
        coursId: 1,
      },
      // Cours 2: Assembler une étagère en kit
      {
        content: "# Matériel nécessaire\n\nRassemblez les pièces du kit, les vis et les chevilles fournies.",
        numberPage: 1,
        coursId: 2,
      },
      {
        content: "# Assemblage des côtés\n\nFixez les montants latéraux aux étagères avec les vis fournies.",
        numberPage: 2,
        coursId: 2,
      },
      {
        content: "# Fixation au mur\n\nPercez les trous et fixez l'étagère au mur avec les chevilles.",
        numberPage: 3,
        coursId: 2,
      },
      {
        content: "# Vérification\n\nTestez la stabilité en appuyant légèrement sur l'étagère.",
        numberPage: 4,
        coursId: 2,
      },
      // Cours 3: Réparer une porte qui grince
      {
        content: "# Identifier la cause\n\nLe grincement vient souvent des gonds desserrés ou secs.",
        numberPage: 1,
        coursId: 3,
      },
      {
        content: "# Lubrifier les gonds\n\nAppliquez de l'huile ou du WD-40 sur les pivots.",
        numberPage: 2,
        coursId: 3,
      },
      {
        content: "# Resserrer les vis\n\nSerrez les vis des gonds pour stabiliser la porte.",
        numberPage: 3,
        coursId: 3,
      },
      {
        content: "# Tester\n\nOuvrez et fermez la porte pour vérifier l'absence de bruit.",
        numberPage: 4,
        coursId: 3,
      },
      // Cours 4: Poser du parquet flottant
      {
        content: "# Préparation du sol\n\nAssurez-vous que le sol est propre, sec et plat.",
        numberPage: 1,
        coursId: 4,
      },
      {
        content: "# Pose des lames\n\nCommencez par un coin et emboîtez les lames les unes dans les autres.",
        numberPage: 2,
        coursId: 4,
      },
      {
        content: "# Découpe\n\nUtilisez une scie pour ajuster les lames aux dimensions.",
        numberPage: 3,
        coursId: 4,
      },
      {
        content: "# Finition\n\nInstallez les plinthes pour cacher les joints.",
        numberPage: 4,
        coursId: 4,
      },
      // Cours 5: Fabriquer une boîte de rangement
      {
        content: "# Dessin et découpe\n\nDessinez les plans et coupez le bois aux dimensions.",
        numberPage: 1,
        coursId: 5,
      },
      {
        content: "# Assemblage\n\nCollez et vissez les faces de la boîte.",
        numberPage: 2,
        coursId: 5,
      },
      {
        content: "# Ponçage\n\nPoncez les surfaces pour un fini lisse.",
        numberPage: 3,
        coursId: 5,
      },
      {
        content: "# Finition\n\nAppliquez du vernis pour protéger le bois.",
        numberPage: 4,
        coursId: 5,
      },
      // Cours 6: Installer un siphon de lavabo
      {
        content: "# Avantages du siphon neuf\n\nUn siphon neuf protège contre les remontées d'odeurs et assure une bonne évacuation des eaux usées.",
        numberPage: 1,
        coursId: 6,
      },
      {
        content: "# Préparer la zone\n\nCoupez l'eau, placez un seau et préparez les outils nécessaires avant de démonter l'ancien siphon.",
        numberPage: 2,
        coursId: 6,
      },
      {
        content: "# Montage du siphon\n\nAssemblez les joints, serrez à la clé à molette et vérifiez que l'ensemble est bien aligné pour éviter les fuites.",
        
        numberPage: 3,
        coursId: 6,
      },
      {
        content: "# Contrôle final\n\nRouvrez l'eau, observez l'écoulement et vérifiez l'absence de gouttes sous le lavabo.",
        numberPage: 4,
        coursId: 6,
      },
      // Cours 7: Réparer une fuite d'eau
      {
        content: "# Localiser la fuite\n\nIdentifiez l'origine de la fuite en observant les traces d'humidité.",
        numberPage: 1,
        coursId: 7,
      },
      {
        content: "# Couper l'eau\n\nFermez la vanne d'arrêt principale pour arrêter l'écoulement.",
        numberPage: 2,
        coursId: 7,
      },
      {
        content: "# Réparer\n\nChangez le joint ou resserrez le raccord défaillant.",
        numberPage: 3,
        coursId: 7,
      },
      {
        content: "# Tester\n\nRouvrez l'eau et vérifiez qu'il n'y a plus de fuite.",
        numberPage: 4,
        coursId: 7,
      },
      // Cours 8: Installer un WC suspendu
      {
        content: "# Préparation\n\nFixez la plaque de fixation au mur et raccordez les eaux.",
        numberPage: 1,
        coursId: 8,
      },
      {
        content: "# Montage\n\nAccrochez le WC sur la plaque et serrez les fixations.",
        numberPage: 2,
        coursId: 8,
      },
      {
        content: "# Raccordements\n\nConnectez les flexibles d'eau et d'évacuation.",
        numberPage: 3,
        coursId: 8,
      },
      {
        content: "# Tests\n\nVérifiez l'étanchéité et le bon fonctionnement.",
        numberPage: 4,
        coursId: 8,
      },
      // Cours 9: Changer un robinet de douche
      {
        content: "# Dépose\n\nCoupez l'eau et démontez l'ancien robinet.",
        numberPage: 1,
        coursId: 9,
      },
      {
        content: "# Préparation\n\nNettoyez les filetages et appliquez du téflon.",
        numberPage: 2,
        coursId: 9,
      },
      {
        content: "# Installation\n\nVissez le nouveau robinet et raccordez les flexibles.",
        numberPage: 3,
        coursId: 9,
      },
      {
        content: "# Vérification\n\nTestez l'ouverture et la fermeture sans fuites.",
        numberPage: 4,
        coursId: 9,
      },
      // Cours 10: Installer une douche
      {
        content: "# Préparation du sol\n\nInstallez le receveur de douche et assurez l'étanchéité.",
        numberPage: 1,
        coursId: 10,
      },
      {
        content: "# Montage des parois\n\nFixez les parois vitrées ou en acrylique.",
        numberPage: 2,
        coursId: 10,
      },
      {
        content: "# Raccordements\n\nConnectez l'arrivée d'eau et l'évacuation.",
        numberPage: 3,
        coursId: 10,
      },
      {
        content: "# Finition\n\nAppliquez les joints silicone pour l'étanchéité.",
        numberPage: 4,
        coursId: 10,
      },
      // Cours 11: Changer un interrupteur simple
      {
        content: "# Sécurité électrique\n\nCoupez le courant au tableau avant de toucher tout câble d'interrupteur. Vérifiez l'absence de tension.",
        numberPage: 1,
        coursId: 11,
      },
      {
        content: "# Retirer l'interrupteur existant\n\nDévissez la plaque, retirez la carcasse et identifiez les fils à l'aide du schéma simple du circuit.",
        numberPage: 2,
        coursId: 11,
      },
      {
        content: "# Poser le nouvel interrupteur\n\nBranchez les fils sur les bornes prévues, fixez l'appareil et reposez la plaque.",
        numberPage: 3,
        coursId: 11,
      },
      {
        content: "# Vérification\n\nRemettez le courant, testez l'interrupteur et assurez-vous qu'il fonctionne sans étincelles.",
        numberPage: 4,
        coursId: 11,
      },
      // Cours 12: Installer une prise électrique
      {
        content: "# Préparation\n\nCoupez le courant et percez le mur à l'emplacement choisi.",
        numberPage: 1,
        coursId: 12,
      },
      {
        content: "# Tirage des câbles\n\nTirez les câbles depuis le tableau électrique.",
        numberPage: 2,
        coursId: 12,
      },
      {
        content: "# Montage\n\nFixez la boîte d'encastrement et branchez la prise.",
        numberPage: 3,
        coursId: 12,
      },
      {
        content: "# Tests\n\nRemettez le courant et vérifiez le fonctionnement.",
        numberPage: 4,
        coursId: 12,
      },
      // Cours 13: Changer un fusible
      {
        content: "# Identifier\n\nTrouvez le fusible grillé dans le tableau.",
        numberPage: 1,
        coursId: 13,
      },
      {
        content: "# Retirer\n\nDévissez ou retirez le fusible défaillant.",
        numberPage: 2,
        coursId: 13,
      },
      {
        content: "# Installer\n\nPlacez un fusible neuf de même ampérage.",
        numberPage: 3,
        coursId: 13,
      },
      {
        content: "# Tester\n\nRemettez le courant et vérifiez.",
        numberPage: 4,
        coursId: 13,
      },
      // Cours 14: Changer une ampoule
      {
        content: "# Sécurité\n\nAssurez-vous que l'interrupteur est éteint.",
        numberPage: 1,
        coursId: 14,
      },
      {
        content: "# Dévisser\n\nTournez l'ampoule grillée dans le sens inverse des aiguilles.",
        numberPage: 2,
        coursId: 14,
      },
      {
        content: "# Visser\n\nInstallez la nouvelle ampoule en vissant dans le sens horaire.",
        numberPage: 3,
        coursId: 14,
      },
      {
        content: "# Allumer\n\nTestez en allumant l'interrupteur.",
        numberPage: 4,
        coursId: 14,
      },
      // Cours 15: Installer un détecteur de fumée
      {
        content: "# Choix de l'emplacement\n\nPlacez-le au plafond, loin des sources de vapeur.",
        numberPage: 1,
        coursId: 15,
      },
      {
        content: "# Fixation\n\nVissez la base au plafond.",
        numberPage: 2,
        coursId: 15,
      },
      {
        content: "# Connexion\n\nBranchez les piles ou reliez au circuit si électrique.",
        numberPage: 3,
        coursId: 15,
      },
      {
        content: "# Test\n\nAppuyez sur le bouton de test pour vérifier.",
        numberPage: 4,
        coursId: 15,
      },
      // Cours 16: Purger un radiateur à eau
      {
        content: "# Pourquoi purger un radiateur ?\n\nLa purge élimine l'air emprisonné, améliore la circulation d'eau et augmente le confort thermique.",
        numberPage: 1,
        coursId: 16,
      },
      {
        content: "# Préparation\n\nPlacez un récipient sous la purge, ouvrez doucement la vanne et laissez l'air s'échapper jusqu'à l'eau.",
        numberPage: 2,
        coursId: 16,
      },
      {
        content: "# Refaire la pression\n\nAprès purge, vérifiez la pression de votre installation et remplissez si nécessaire pour maintenir le bon débit.",
        numberPage: 3,
        coursId: 16,
      },
      {
        content: "# Entretien\n\nPurger régulièrement prolonge la durée de vie du radiateur et réduit le bruit de la centrale thermique.",
        numberPage: 4,
        coursId: 16,
      },
      // Cours 17: Changer un radiateur
      {
        content: "# Vidange\n\nVidangez le circuit de chauffage.",
        numberPage: 1,
        coursId: 17,
      },
      {
        content: "# Dépose\n\nDémontez l'ancien radiateur.",
        numberPage: 2,
        coursId: 17,
      },
      {
        content: "# Installation\n\nFixez le nouveau radiateur et raccordez-le.",
        numberPage: 3,
        coursId: 17,
      },
      {
        content: "# Purge\n\nRemplissez et purgez le système.",
        numberPage: 4,
        coursId: 17,
      },
      // Cours 18: Nettoyer un conduit de cheminée
      {
        content: "# Préparation\n\nProtégez le sol et rassemblez les outils.",
        numberPage: 1,
        coursId: 18,
      },
      {
        content: "# Nettoyage\n\nUtilisez une brosse pour retirer la suie.",
        numberPage: 2,
        coursId: 18,
      },
      {
        content: "# Aspiration\n\nAspirez les dépôts tombés.",
        numberPage: 3,
        coursId: 18,
      },
      {
        content: "# Vérification\n\nInspectez l'état du conduit.",
        numberPage: 4,
        coursId: 18,
      },
      // Cours 19: Installer un thermostat programmable
      {
        content: "# Choix\n\nSélectionnez un thermostat compatible.",
        numberPage: 1,
        coursId: 19,
      },
      {
        content: "# Dépose\n\nRetirez l'ancien thermostat.",
        numberPage: 2,
        coursId: 19,
      },
      {
        content: "# Installation\n\nFixez et câblez le nouveau.",
        numberPage: 3,
        coursId: 19,
      },
      {
        content: "# Programmation\n\nConfigurez les horaires.",
        numberPage: 4,
        coursId: 19,
      },
      // Cours 20: Isoler un mur intérieur
      {
        content: "# Préparation\n\nNettoyez et préparez le mur.",
        numberPage: 1,
        coursId: 20,
      },
      {
        content: "# Pose de l'isolant\n\nFixez les panneaux isolants.",
        numberPage: 2,
        coursId: 20,
      },
      {
        content: "# Finition\n\nRecouvrez d'un parement.",
        numberPage: 3,
        coursId: 20,
      },
      {
        content: "# Vérification\n\nTestez l'isolation thermique.",
        numberPage: 4,
        coursId: 20,
      },
      // Cours 21: Poser une faïence murale
      {
        content: "# Préparer le mur\n\nNettoyez et dégraissez la surface, rebouchez les trous et appliquez un primaire si nécessaire.",
        numberPage: 1,
        coursId: 21,
      },
      {
        content: "# Étaler le mortier-colle\n\nUtilisez une spatule crantée pour répartir le mortier-colle de manière homogène sur le mur.",
        numberPage: 2,
        coursId: 21,
      },
      {
        content: "# Poser la faïence\n\nCommencez par la première rangée, appuyez bien et laissez des joints réguliers entre les carreaux.",
        numberPage: 3,
        coursId: 21,
      },
      {
        content: "# Réaliser les joints\n\nAprès séchage, lissez les joints et nettoyez les excès pour une finition propre.",
        numberPage: 4,
        coursId: 21,
      },
      // Cours 22: Poser du carrelage au sol
      {
        content: "# Préparation du sol\n\nNivelez et nettoyez la surface.",
        numberPage: 1,
        coursId: 22,
      },
      {
        content: "# Mortier\n\nÉtalez le mortier-colle.",
        numberPage: 2,
        coursId: 22,
      },
      {
        content: "# Pose\n\nPlacez les carreaux et alignez-les.",
        numberPage: 3,
        coursId: 22,
      },
      {
        content: "# Joints\n\nAppliquez les joints après séchage.",
        numberPage: 4,
        coursId: 22,
      },
      // Cours 23: Réparer une fissure dans le carrelage
      {
        content: "# Nettoyer\n\nDégraissez la fissure.",
        numberPage: 1,
        coursId: 23,
      },
      {
        content: "# Remplir\n\nAppliquez du mastic adapté.",
        numberPage: 2,
        coursId: 23,
      },
      {
        content: "# Lisser\n\nNivelez le mastic.",
        numberPage: 3,
        coursId: 23,
      },
      {
        content: "# Sécher\n\nLaissez sécher et nettoyez.",
        numberPage: 4,
        coursId: 23,
      },
      // Cours 24: Poser une moquette
      {
        content: "# Préparation\n\nNettoyez et nivelez le sol.",
        numberPage: 1,
        coursId: 24,
      },
      {
        content: "# Découpe\n\nCoupez la moquette aux dimensions.",
        numberPage: 2,
        coursId: 24,
      },
      {
        content: "# Fixation\n\nCollez ou agrafez la moquette.",
        numberPage: 3,
        coursId: 24,
      },
      {
        content: "# Finition\n\nInstallez les plinthes.",
        numberPage: 4,
        coursId: 24,
      },
      // Cours 25: Changer un carreau de carrelage
      {
        content: "# Retirer\n\nCassez et retirez l'ancien carreau.",
        numberPage: 1,
        coursId: 25,
      },
      {
        content: "# Préparer\n\nNettoyez la surface.",
        numberPage: 2,
        coursId: 25,
      },
      {
        content: "# Poser\n\nAppliquez le mortier et posez le nouveau.",
        numberPage: 3,
        coursId: 25,
      },
      {
        content: "# Joints\n\nFaites les joints.",
        numberPage: 4,
        coursId: 25,
      },
      // Cours 26: Préparer et peindre un mur
      {
        content: "# Préparer la surface\n\nPoncer les irrégularités, dépoussiérer et masquer les zones à protéger avant application.",
        numberPage: 1,
        coursId: 26,
      },
      {
        content: "# Appliquer la sous-couche\n\nLa sous-couche permet une meilleure adhérence et une uniformité de la peinture finale.",
        numberPage: 2,
        coursId: 26,
      },
      {
        content: "# Peindre au rouleau\n\nTravaillez par bandes verticales et croisez les passes pour éviter les traces.",
        numberPage: 3,
        coursId: 26,
      },
      {
        content: "# Finitions\n\nReprenez les angles au pinceau et vérifiez l'homogénéité du mur après séchage.",
        numberPage: 4,
        coursId: 26,
      },
      // Cours 27: Poser du papier peint
      {
        content: "# Préparation\n\nNettoyez et lissez le mur.",
        numberPage: 1,
        coursId: 27,
      },
      {
        content: "# Encollage\n\nAppliquez la colle sur le papier.",
        numberPage: 2,
        coursId: 27,
      },
      {
        content: "# Pose\n\nCollez le papier en lissant pour éviter les bulles.",
        numberPage: 3,
        coursId: 27,
      },
      {
        content: "# Découpe\n\nCoupez les excès autour des angles.",
        numberPage: 4,
        coursId: 27,
      },
      // Cours 28: Peindre une porte
      {
        content: "# Poncer\n\nPoncez la porte pour un fini lisse.",
        numberPage: 1,
        coursId: 28,
      },
      {
        content: "# Masquer\n\nProtégez les parties non à peindre.",
        numberPage: 2,
        coursId: 28,
      },
      {
        content: "# Peindre\n\nAppliquez la peinture en couches fines.",
        numberPage: 3,
        coursId: 28,
      },
      {
        content: "# Sécher\n\nLaissez sécher et retirez le masking.",
        numberPage: 4,
        coursId: 28,
      },
      // Cours 29: Appliquer une peinture décorative
      {
        content: "# Base\n\nAppliquez une couche de base.",
        numberPage: 1,
        coursId: 29,
      },
      {
        content: "# Technique\n\nUtilisez la technique choisie (effet, texture).",
        numberPage: 2,
        coursId: 29,
      },
      {
        content: "# Application\n\nAppliquez la peinture décorative.",
        numberPage: 3,
        coursId: 29,
      },
      {
        content: "# Finition\n\nLissez et laissez sécher.",
        numberPage: 4,
        coursId: 29,
      },
      // Cours 30: Peindre un plafond
      {
        content: "# Préparation\n\nProtégez le sol et les meubles.",
        numberPage: 1,
        coursId: 30,
      },
      {
        content: "# Masquage\n\nMasquez les bords.",
        numberPage: 2,
        coursId: 30,
      },
      {
        content: "# Peinture\n\nUtilisez un rouleau adapté pour plafonds.",
        numberPage: 3,
        coursId: 30,
      },
      {
        content: "# Nettoyage\n\nNettoyez les coulures immédiatement.",
        numberPage: 4,
        coursId: 30,
      },
    ],
  });
  console.log("Contenus :", coursContents.count);

  // Opinions (notes des cours)
  const avis = await prisma.opinion.createMany({
    data: [
      { userId: 2, coursId: 1, note: 5, content: "Très pratique, j'ai posé mon étagère sans problème." },
      { userId: 3, coursId: 2, note: 4, content: "Facile à suivre pour un kit." },
      { userId: 6, coursId: 3, note: 5, content: "La porte ne grince plus !" },
      { userId: 7, coursId: 4, note: 4, content: "Parquet posé en une journée." },
      { userId: 9, coursId: 5, note: 5, content: "Boîte parfaite pour mes outils." },
      { userId: 2, coursId: 6, note: 4, content: "Siphon changé sans fuite." },
      { userId: 3, coursId: 7, note: 5, content: "Fuite réparée rapidement." },
      { userId: 6, coursId: 8, note: 4, content: "WC suspendu installé proprement." },
      { userId: 7, coursId: 9, note: 5, content: "Douche neuve fonctionnelle." },
      { userId: 9, coursId: 10, note: 4, content: "Douche complète réussie." },
      { userId: 2, coursId: 11, note: 5, content: "Interrupteur changé en sécurité." },
      { userId: 3, coursId: 12, note: 4, content: "Prise ajoutée facilement." },
      { userId: 6, coursId: 13, note: 5, content: "Fusible remplacé vite." },
      { userId: 7, coursId: 14, note: 5, content: "Ampoule changée en 1 min." },
      { userId: 9, coursId: 15, note: 4, content: "Détecteur installé et testé." },
      { userId: 2, coursId: 16, note: 5, content: "Radiateur plus chaud après purge." },
      { userId: 3, coursId: 17, note: 4, content: "Radiateur changé sans problème." },
      { userId: 6, coursId: 18, note: 5, content: "Cheminée propre et sûre." },
      { userId: 7, coursId: 19, note: 4, content: "Thermostat programmable utile." },
      { userId: 9, coursId: 20, note: 5, content: "Mur isolé, économies d'énergie." },
      { userId: 2, coursId: 21, note: 4, content: "Faïence posée régulièrement." },
      { userId: 3, coursId: 22, note: 5, content: "Sol carrelé impeccable." },
      { userId: 6, coursId: 23, note: 5, content: "Fissure réparée invisible." },
      { userId: 7, coursId: 24, note: 4, content: "Moquette posée confortablement." },
      { userId: 9, coursId: 25, note: 5, content: "Carreau changé parfaitement." },
      { userId: 2, coursId: 26, note: 4, content: "Mur peint sans traces." },
      { userId: 3, coursId: 27, note: 5, content: "Papier peint posé sans bulles." },
      { userId: 6, coursId: 28, note: 4, content: "Porte repeinte joliment." },
      { userId: 7, coursId: 29, note: 5, content: "Peinture décorative réussie." },
      { userId: 9, coursId: 30, note: 4, content: "Plafond peint proprement." },
    ],
  });
  console.log("Avis :", avis.count);

  // Commentaires (questions sur les cours)
  const comments = await prisma.comment.createMany({
    data: [
      { description: "Quelle épaisseur d'étagère recommandez-vous ?", authorId: 2, coursId: 1 },
      { description: "Le kit comprend-il toutes les vis ?", authorId: 3, coursId: 2 },
      { description: "Quel lubrifiant utiliser pour les gonds ?", authorId: 6, coursId: 3 },
      { description: "Faut-il une sous-couche pour le parquet ?", authorId: 7, coursId: 4 },
      { description: "Quel bois choisir pour la boîte ?", authorId: 9, coursId: 5 },
      { description: "Comment éviter les odeurs après changement ?", authorId: 2, coursId: 6 },
      { description: "Quelle taille de joint pour la réparation ?", authorId: 3, coursId: 7 },
      { description: "Le WC suspendu supporte-t-il le poids ?", authorId: 6, coursId: 8 },
      { description: "Quel type de robinet pour douche ?", authorId: 7, coursId: 9 },
      { description: "Comment étanchéifier le receveur ?", authorId: 9, coursId: 10 },
      { description: "Faut-il un disjoncteur différentiel ?", authorId: 2, coursId: 11 },
      { description: "Quelle section de câble pour la prise ?", authorId: 3, coursId: 12 },
      { description: "Comment identifier l'ampérage du fusible ?", authorId: 6, coursId: 13 },
      { description: "Quelle puissance d'ampoule recommandée ?", authorId: 7, coursId: 14 },
      { description: "Le détecteur est-il connecté au réseau ?", authorId: 9, coursId: 15 },
      { description: "À quelle fréquence purger les radiateurs ?", authorId: 2, coursId: 16 },
      { description: "Quel type de radiateur choisir ?", authorId: 3, coursId: 17 },
      { description: "Faut-il un professionnel pour la cheminée ?", authorId: 6, coursId: 18 },
      { description: "Le thermostat est-il compatible avec mon système ?", authorId: 7, coursId: 19 },
      { description: "Quel isolant pour un mur humide ?", authorId: 9, coursId: 20 },
      { description: "Comment aligner les faïences parfaitement ?", authorId: 2, coursId: 21 },
      { description: "Quelle épaisseur de mortier pour le sol ?", authorId: 3, coursId: 22 },
      { description: "Le mastic sèche-t-il rapidement ?", authorId: 6, coursId: 23 },
      { description: "Comment fixer la moquette sans colle ?", authorId: 7, coursId: 24 },
      { description: "Faut-il reboucher derrière le carreau ?", authorId: 9, coursId: 25 },
      { description: "Quelle peinture pour un mur extérieur ?", authorId: 2, coursId: 26 },
      { description: "Comment enlever l'ancien papier peint ?", authorId: 3, coursId: 27 },
      { description: "Quelle peinture pour boiseries ?", authorId: 6, coursId: 28 },
      { description: "Où trouver des peintures décoratives ?", authorId: 7, coursId: 29 },
      { description: "Comment éviter les coulures au plafond ?", authorId: 9, coursId: 30 },
    ],
  });
  console.log("Commentaires :", comments.count);

  const badges = await prisma.badge.createMany({
    data:[
      {name:"1 cours terminée",description:"Tu a terminé un cours! Bravo continue",icon:"one-star",color:"#f0f"},
      {name:"5 cours terminée",description:"Tu a terminé cinq cours! Tu gere",icon:"two-star",color:"rgb(84, 255, 112)"},
      {name:"10 cours terminée",description:"Tu a terminé dix cours! Un vrai pro",icon:"three-star",color:"rgb(252, 193, 0)"}
    ]
  })
  console.log("Badges :", badges.count);
  
   const asignedBadges =  await prisma.userHasBadge.createMany({
            data: [
              {userId:2, badgeId:1 }, {userId:2, badgeId:2 },{userId:2, badgeId:3 },
              {userId:3, badgeId:1 }, 
            ]
          })
    console.log("Badges assigned:", asignedBadges.count);
  
  console.log("Termined");
}

seed();
