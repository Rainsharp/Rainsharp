import type { Locale } from '../i18n/config';

export const productSlugs = ['aeoms', 'agior', 'agiorcloud', 'agiorgo', 'cavacash', 'imarapower'] as const;
export type ProductSlug = (typeof productSlugs)[number];

type Feature = { title: string; body: string };
type Link = { slug: ProductSlug; note: string };

export interface ProductCopy {
  category: string;
  tagline: string;
  summary: string;
  overview: string[];
  features: Feature[];
  audiences: string[];
  links: Link[];
  /** Optional highlighted note, e.g. regulatory positioning. */
  callout?: { title: string; body: string };
  /** Optional list block rendered after features (roadmap, components…). */
  extra?: { title: string; items: string[] };
}

export interface Product {
  slug: ProductSlug;
  name: string;
  layer: 'station' | 'cloud' | 'users';
  /** Real product icon from the previous site, if one exists. */
  icon?: string;
  /** Official logo set: mark + wordmark in tones for light and dark backgrounds. */
  logo?: {
    mark: { color: string; white: string; black: string };
    wordmark: { color: string; white: string; black: string };
  };
  /** Two-letter monogram used when no icon exists. */
  mark?: string;
  /** Tailwind gradient classes used for the monogram tile and accents. */
  accent: string;
  copy: Record<Locale, ProductCopy>;
}

export const products: Product[] = [
  {
    slug: 'aeoms',
    name: 'AEOMS',
    layer: 'station',
    icon: '/brand/aeoms-icon.png',
    accent: 'from-sky-400 to-indigo-500',
    copy: {
      fr: {
        category: 'Terminal intelligent de péage',
        tagline: 'Le matériel en voie de chaque poste de péage.',
        summary: 'Terminaux intelligents installés dans les postes de péage, socle matériel d’AGIOR.',
        overview: [
          'AEOMS est la gamme de terminaux matériels intelligents installés dans les voies et les cabines des postes de péage autoroutier.',
          'Chaque terminal embarque le système d’exploitation de station AGIOR et pilote les équipements de voie pour un passage rapide et traçable.',
        ],
        features: [
          { title: 'Terminal de voie', body: 'Poste de travail durci pour l’encaissement et l’identification des véhicules en voie.' },
          { title: 'Contrôle des terminaux', body: 'Supervision de l’état des terminaux et des équipements de chaque voie.' },
          { title: 'Levée de barrière', body: 'Commande de la barrière en fonction de la validation du passage.' },
          { title: 'AGIOR embarqué', body: 'Livré avec AGIOR pour fonctionner directement au sein du système de station.' },
        ],
        audiences: ['Concessionnaires', 'Exploitants de postes de péage'],
        links: [
          { slug: 'agior', note: 'AGIOR s’exécute sur les terminaux AEOMS.' },
          { slug: 'imarapower', note: 'IMARAPOWER alimente la station et ses terminaux.' },
        ],
      },
      en: {
        category: 'Smart toll terminal',
        tagline: 'The in-lane hardware of every toll station.',
        summary: 'Smart terminals installed at toll stations — the hardware foundation for AGIOR.',
        overview: [
          'AEOMS is the range of smart hardware terminals installed in the lanes and booths of highway toll stations.',
          'Each terminal runs the AGIOR station operations system and drives lane equipment for fast, traceable passages.',
        ],
        features: [
          { title: 'Lane terminal', body: 'Rugged workstation for toll collection and vehicle identification in the lane.' },
          { title: 'Terminal control', body: 'Monitoring of terminal and lane-equipment status across the station.' },
          { title: 'Barrier release', body: 'Barrier control driven by passage validation.' },
          { title: 'AGIOR on board', body: 'Ships with AGIOR to work natively inside the station system.' },
        ],
        audiences: ['Concessionaires', 'Toll station operators'],
        links: [
          { slug: 'agior', note: 'AGIOR runs on AEOMS terminals.' },
          { slug: 'imarapower', note: 'IMARAPOWER powers the station and its terminals.' },
        ],
      },
      zh: {
        category: '收费站智能终端',
        tagline: '每个收费站车道上的智能硬件。',
        summary: '部署于收费站的智能终端硬件，是 AGIOR 的运行载体。',
        overview: [
          'AEOMS 是部署于高速公路收费站车道与收费亭的智能终端硬件系列。',
          '每台终端运行收费站运营管理系统 AGIOR，驱动车道设备，实现快速、可追溯的通行。',
        ],
        features: [
          { title: '车道终端', body: '面向车道收费与车辆识别的加固型工作终端。' },
          { title: '终端控制', body: '监控全站终端及车道设备运行状态。' },
          { title: '栏杆放行', body: '依据通行校验结果控制栏杆抬落。' },
          { title: '预装 AGIOR', body: '出厂即运行 AGIOR，直接接入收费站系统。' },
        ],
        audiences: ['特许经营方', '收费站运营方'],
        links: [
          { slug: 'agior', note: 'AGIOR 运行于 AEOMS 终端之上。' },
          { slug: 'imarapower', note: 'IMARAPOWER 为收费站及终端供电。' },
        ],
      },
    },
  },
  {
    slug: 'agior',
    name: 'AGIOR',
    layer: 'station',
    logo: {
      mark: { color: '/brand/agior/agior-mark-color.png', white: '/brand/agior/agior-mark-white.png', black: '/brand/agior/agior-mark-black.png' },
      wordmark: { color: '/brand/agior/agior-wordmark-navy.png', white: '/brand/agior/agior-wordmark-white.png', black: '/brand/agior/agior-wordmark-black.png' },
    },
    accent: 'from-blue-600 to-indigo-700',
    copy: {
      fr: {
        category: 'Système d’exploitation de station',
        tagline: 'Le cerveau local de chaque poste de péage.',
        summary: 'Système de gestion des opérations de péage, déployé sur site sur AEOMS et les serveurs locaux.',
        overview: [
          'AGIOR est le système de gestion des opérations des postes de péage. Il est déployé sur site : installé sur les terminaux AEOMS et sur les serveurs locaux de la station.',
          'Il orchestre les passages, la gestion des véhicules et la supervision de la station, et synchronise ses données avec AGIORCLOUD.',
        ],
        features: [
          { title: 'Gestion des passages', body: 'Validation des passages et commande de levée de barrière en voie.' },
          { title: 'Gestion des véhicules', body: 'Suivi des véhicules, des comptes prépayés et des abonnements mensuels.' },
          { title: 'Supervision de la station', body: 'Surveillance de la route et des voies, état des terminaux en temps réel.' },
          { title: 'Déploiement sur site', body: 'Installé sur AEOMS et les serveurs locaux, avec synchronisation vers AGIORCLOUD.' },
        ],
        audiences: ['Concessionnaires', 'Chefs de poste et agents de péage'],
        links: [
          { slug: 'aeoms', note: 'Fonctionne sur les terminaux AEOMS.' },
          { slug: 'agiorcloud', note: 'Remonte les passages vers le cloud.' },
          { slug: 'cavacash', note: 'Débite les comptes prépayés et abonnements.' },
        ],
      },
      en: {
        category: 'Station operations system',
        tagline: 'The local brain of every toll station.',
        summary: 'Toll station operations management system, deployed on-premise on AEOMS and local servers.',
        overview: [
          'AGIOR is the operations management system for toll stations. It is deployed on-premise: installed on AEOMS terminals and on the station’s local servers.',
          'It orchestrates passages, vehicle management and station supervision, and syncs its data with AGIORCLOUD.',
        ],
        features: [
          { title: 'Passage management', body: 'Validates passages and drives barrier release in the lane.' },
          { title: 'Vehicle management', body: 'Tracks vehicles, prepaid accounts and monthly passes.' },
          { title: 'Station supervision', body: 'Road and lane monitoring with real-time terminal status.' },
          { title: 'On-premise deployment', body: 'Runs on AEOMS and local servers, syncing up to AGIORCLOUD.' },
        ],
        audiences: ['Concessionaires', 'Station managers and toll agents'],
        links: [
          { slug: 'aeoms', note: 'Runs on AEOMS terminals.' },
          { slug: 'agiorcloud', note: 'Sends passages up to the cloud.' },
          { slug: 'cavacash', note: 'Debits prepaid accounts and passes.' },
        ],
      },
      zh: {
        category: '收费站运营管理系统',
        tagline: '每个收费站的本地中枢。',
        summary: '收费站运营管理系统，本地化部署于 AEOMS 终端及收费站本地服务器。',
        overview: [
          'AGIOR 是收费站运营管理系统，采用本地化部署：安装在 AEOMS 终端以及收费站本地服务器上。',
          '它统筹车辆通行、车辆管理与站点监控，并与 AGIORCLOUD 进行数据同步。',
        ],
        features: [
          { title: '通行放行管理', body: '校验车辆通行并驱动车道栏杆放行。' },
          { title: '车辆管理', body: '管理车辆信息、预付账户与月票。' },
          { title: '站点监控', body: '道路与车道监控，终端状态实时可见。' },
          { title: '本地化部署', body: '运行于 AEOMS 与本地服务器，并同步至 AGIORCLOUD。' },
        ],
        audiences: ['特许经营方', '收费站站长及收费员'],
        links: [
          { slug: 'aeoms', note: '运行于 AEOMS 终端。' },
          { slug: 'agiorcloud', note: '通行数据同步至云平台。' },
          { slug: 'cavacash', note: '对预付账户及月票扣费。' },
        ],
      },
    },
  },
  {
    slug: 'agiorcloud',
    mark: 'AC',
    logo: {
      mark: { color: '/brand/agiorcloud/agiorcloud-mark-color.svg', white: '/brand/agiorcloud/agiorcloud-mark-white.svg', black: '/brand/agiorcloud/agiorcloud-mark-black.svg' },
      wordmark: { color: '/brand/agiorcloud/agiorcloud-wordmark-color.svg', white: '/brand/agiorcloud/agiorcloud-wordmark-white.svg', black: '/brand/agiorcloud/agiorcloud-wordmark-black.svg' },
    },
    name: 'AGIORCLOUD',
    layer: 'cloud',
    accent: 'from-indigo-500 to-violet-600',
    copy: {
      fr: {
        category: 'Plateforme cloud entreprise',
        tagline: 'Piloter les passages de tout un réseau, depuis le cloud.',
        summary: 'Plateforme cloud pour concessionnaires, entreprises de transport et autres clients professionnels.',
        overview: [
          'AGIORCLOUD est la plateforme cloud destinée aux concessionnaires, aux entreprises de transport et aux autres clients professionnels pour gérer le passage de leurs véhicules.',
          'Elle consolide les données de toutes les stations AGIOR et donne à chaque organisation une vue claire sur ses véhicules, ses passages et ses dépenses.',
        ],
        features: [
          { title: 'Comptes entreprise', body: 'Enregistrement et gestion des entreprises, de leurs utilisateurs et de leurs flottes.' },
          { title: 'Recherche véhicules & données', body: 'Consultation directe des véhicules et de l’historique des passages.' },
          { title: 'Vue réseau', body: 'Données consolidées de toutes les stations pour les concessionnaires.' },
          { title: 'Analyse & export', body: 'Tableaux de bord, rapports et export des données.' },
        ],
        audiences: ['Concessionnaires', 'Entreprises de transport', 'Clients professionnels'],
        links: [
          { slug: 'agior', note: 'Reçoit les données de chaque station.' },
          { slug: 'cavacash', note: 'Gère comptes prépayés et abonnements des entreprises.' },
          { slug: 'agiorgo', note: 'Partage les comptes avec l’application conducteur.' },
        ],
      },
      en: {
        category: 'Enterprise cloud platform',
        tagline: 'Manage vehicle passage across an entire network, from the cloud.',
        summary: 'Cloud platform for concessionaires, transport companies and other enterprise customers.',
        overview: [
          'AGIORCLOUD is the cloud platform that concessionaires, transport companies and other enterprise customers use to manage the passage of their vehicles.',
          'It consolidates data from every AGIOR station and gives each organization a clear view of its vehicles, passages and spend.',
        ],
        features: [
          { title: 'Enterprise accounts', body: 'Registration and management of companies, their users and fleets.' },
          { title: 'Vehicle & data lookup', body: 'Direct vehicle lookup and passage history.' },
          { title: 'Network view', body: 'Consolidated data across all stations for concessionaires.' },
          { title: 'Analytics & export', body: 'Dashboards, reports and data export.' },
        ],
        audiences: ['Concessionaires', 'Transport companies', 'Enterprise customers'],
        links: [
          { slug: 'agior', note: 'Receives data from every station.' },
          { slug: 'cavacash', note: 'Manages company prepaid accounts and passes.' },
          { slug: 'agiorgo', note: 'Shares accounts with the driver app.' },
        ],
      },
      zh: {
        category: '企业云平台',
        tagline: '在云端管理整个路网的车辆通行。',
        summary: '面向特许经营方、运输企业及其他企业客户的云平台。',
        overview: [
          'AGIORCLOUD 是面向特许经营方、运输企业及其他企业客户的云平台，用于管理车辆通行。',
          '平台汇聚各 AGIOR 收费站的数据，让每个组织清晰掌握自己的车辆、通行记录与费用支出。',
        ],
        features: [
          { title: '企业注册与管理', body: '企业、用户及车队的注册与管理。' },
          { title: '车辆与数据查询', body: '车辆直查及通行历史查询。' },
          { title: '路网总览', body: '为特许经营方汇总全路网收费站数据。' },
          { title: '数据分析与导出', body: '数据看板、报表与数据导出。' },
        ],
        audiences: ['特许经营方', '运输企业', '企业客户'],
        links: [
          { slug: 'agior', note: '接收各收费站数据。' },
          { slug: 'cavacash', note: '管理企业预付账户与月票。' },
          { slug: 'agiorgo', note: '与司机 App 共享账户体系。' },
        ],
      },
    },
  },
  {
    slug: 'agiorgo',
    mark: 'GO',
    logo: {
      mark: { color: '/brand/agiorgo/agiorgo-mark-color.svg', white: '/brand/agiorgo/agiorgo-mark-white.svg', black: '/brand/agiorgo/agiorgo-mark-black.svg' },
      wordmark: { color: '/brand/agiorgo/agiorgo-wordmark-color.svg', white: '/brand/agiorgo/agiorgo-wordmark-white.svg', black: '/brand/agiorgo/agiorgo-wordmark-black.svg' },
    },
    name: 'AGIORGO',
    layer: 'users',
    accent: 'from-cyan-400 to-blue-600',
    copy: {
      fr: {
        category: 'Application conducteur · iOS & Android',
        tagline: 'Passer le péage plus vite, sans papier.',
        summary: 'Application mobile des conducteurs : compte de passage prépayé, passage rapide et sans papier.',
        overview: [
          'AGIORGO est l’application mobile des conducteurs, disponible sur iOS et Android.',
          'Elle donne accès à un compte de passage prépayé pour franchir les postes de péage rapidement, sans ticket ni manipulation d’espèces.',
        ],
        features: [
          { title: 'Compte prépayé', body: 'Un compte de passage personnel, adossé à CAVACASH.' },
          { title: 'Passage rapide', body: 'Moins d’attente au guichet grâce au débit automatique du compte.' },
          { title: 'Zéro papier', body: 'Plus de tickets papier ni d’espèces à manipuler.' },
          { title: 'iOS & Android', body: 'Disponible sur les deux principales plateformes mobiles.' },
        ],
        audiences: ['Conducteurs', 'Chauffeurs des entreprises de transport'],
        links: [
          { slug: 'cavacash', note: 'Le compte prépayé est géré par CAVACASH.' },
          { slug: 'agior', note: 'Le passage est validé par AGIOR en station.' },
        ],
        extra: { title: 'Téléchargement', items: ['App Store — lien à confirmer', 'Google Play — lien à confirmer'] },
      },
      en: {
        category: 'Driver app · iOS & Android',
        tagline: 'Faster, paperless toll passage.',
        summary: 'Driver mobile app: prepaid passage account for fast, paperless toll passage.',
        overview: [
          'AGIORGO is the mobile app for drivers, available on iOS and Android.',
          'It gives drivers a prepaid passage account so they can cross toll stations quickly, without tickets or cash.',
        ],
        features: [
          { title: 'Prepaid account', body: 'A personal passage account, backed by CAVACASH.' },
          { title: 'Fast passage', body: 'Shorter waits at the booth thanks to automatic account debit.' },
          { title: 'Paperless', body: 'No more paper tickets or cash handling.' },
          { title: 'iOS & Android', body: 'Available on both major mobile platforms.' },
        ],
        audiences: ['Drivers', 'Transport company drivers'],
        links: [
          { slug: 'cavacash', note: 'The prepaid account is managed by CAVACASH.' },
          { slug: 'agior', note: 'Passages are validated by AGIOR at the station.' },
        ],
        extra: { title: 'Download', items: ['App Store — link to be confirmed', 'Google Play — link to be confirmed'] },
      },
      zh: {
        category: '司机 App · iOS & Android',
        tagline: '更快、无纸化的收费通行。',
        summary: '面向司机的手机 App：预付通行账户，快速、无纸化通行。',
        overview: [
          'AGIORGO 是面向司机的手机应用，支持 iOS 与 Android。',
          '司机可开通预付通行账户，无需纸质票据和现金即可快速通过收费站。',
        ],
        features: [
          { title: '预付通行账户', body: '基于 CAVACASH 的个人通行账户。' },
          { title: '快速通行', body: '自动扣费，减少收费亭前的等待。' },
          { title: '无纸化', body: '告别纸质票据与现金找零。' },
          { title: 'iOS & Android', body: '覆盖两大主流移动平台。' },
        ],
        audiences: ['司机', '运输企业驾驶员'],
        links: [
          { slug: 'cavacash', note: '预付账户由 CAVACASH 管理。' },
          { slug: 'agior', note: '通行由收费站 AGIOR 校验放行。' },
        ],
        extra: { title: '下载', items: ['App Store — 链接待确认', 'Google Play — 链接待确认'] },
      },
    },
  },
  {
    slug: 'cavacash',
    mark: 'CC',
    name: 'CAVACASH',
    layer: 'cloud',
    accent: 'from-emerald-400 to-teal-600',
    copy: {
      fr: {
        category: 'Comptes prépayés & flux financiers',
        tagline: 'Comptes prépayés, abonnements et flux de fonds — en partenariat avec les banques locales.',
        summary: 'Comptes prépayés, abonnements mensuels et gestion des flux de fonds pour concessionnaires et transporteurs.',
        overview: [
          'CAVACASH fournit aux concessionnaires et aux entreprises de transport des comptes prépayés, des abonnements mensuels et des outils de gestion des flux de fonds.',
          'La plateforme est aujourd’hui en service pour le péage autoroutier. Elle a vocation à s’étendre à d’autres usages de monnaie électronique B2B.',
        ],
        features: [
          { title: 'Comptes prépayés', body: 'Comptes entreprise et conducteur, rechargés à l’avance pour les passages.' },
          { title: 'Abonnements mensuels', body: 'Forfaits mensuels et gestion des véhicules temporaires.' },
          { title: 'Gestion des flux', body: 'Suivi en ligne des recharges, débits et affectations de fonds.' },
          { title: 'Affectation & frais', body: 'Répartition des budgets de péage entre véhicules et chauffeurs.' },
        ],
        audiences: ['Concessionnaires', 'Entreprises de transport', 'Banques partenaires'],
        links: [
          { slug: 'agiorgo', note: 'Les conducteurs rechargent via AGIORGO.' },
          { slug: 'agiorcloud', note: 'Les entreprises gèrent leurs comptes dans AGIORCLOUD.' },
          { slug: 'agior', note: 'Les passages sont débités en station par AGIOR.' },
        ],
        callout: {
          title: 'CAVACASH n’est pas un établissement financier',
          body: 'Les fonds des comptes sont détenus par des banques locales partenaires, qui assurent également la compensation secondaire. CAVACASH gère uniquement les flux de fonds en ligne.',
        },
        extra: {
          title: 'Usages',
          items: ['Péage autoroutier — en service', 'Stations-service — à venir', 'Garages et ateliers automobiles — à venir', 'Autres usages de monnaie électronique B2B — à venir'],
        },
      },
      en: {
        category: 'Prepaid accounts & fund flows',
        tagline: 'Prepaid accounts, monthly passes and fund flows — in partnership with local banks.',
        summary: 'Prepaid accounts, monthly passes and fund-flow management for concessionaires and transport companies.',
        overview: [
          'CAVACASH gives concessionaires and transport companies prepaid accounts, monthly passes and fund-flow management tools.',
          'The platform is live today for highway tolls and is designed to extend to other B2B e-cash use cases.',
        ],
        features: [
          { title: 'Prepaid accounts', body: 'Company and driver accounts, topped up in advance for passages.' },
          { title: 'Monthly passes', body: 'Monthly passes and temporary-vehicle management.' },
          { title: 'Fund-flow management', body: 'Online tracking of top-ups, debits and fund allocation.' },
          { title: 'Allocation & fees', body: 'Split toll budgets across vehicles and drivers.' },
        ],
        audiences: ['Concessionaires', 'Transport companies', 'Partner banks'],
        links: [
          { slug: 'agiorgo', note: 'Drivers top up through AGIORGO.' },
          { slug: 'agiorcloud', note: 'Companies manage their accounts in AGIORCLOUD.' },
          { slug: 'agior', note: 'Passages are debited at the station by AGIOR.' },
        ],
        callout: {
          title: 'CAVACASH is not a financial institution',
          body: 'Account funds are held by local partner banks, which also perform secondary clearing. CAVACASH only manages the online fund flows.',
        },
        extra: {
          title: 'Use cases',
          items: ['Highway tolls — live', 'Gas stations — coming', 'Auto repair shops — coming', 'Other B2B e-cash scenarios — coming'],
        },
      },
      zh: {
        category: '预付账户与资金流管理',
        tagline: '预付账户、月票与资金流管理——与本地银行合作。',
        summary: '为特许经营方与运输企业提供预付账户、月票及资金流管理。',
        overview: [
          'CAVACASH 为特许经营方和运输企业提供预付账户、月票以及资金流管理工具。',
          '平台目前已在高速公路收费场景上线，未来将拓展至更多 B2B 电子现金场景。',
        ],
        features: [
          { title: '预付账户', body: '企业账户与司机账户，预先充值用于通行。' },
          { title: '月票管理', body: '月票及临时车辆管理。' },
          { title: '资金流管理', body: '线上跟踪充值、扣费与资金划拨。' },
          { title: '调度与费用管理', body: '在车辆与司机之间分配通行费预算。' },
        ],
        audiences: ['特许经营方', '运输企业', '合作银行'],
        links: [
          { slug: 'agiorgo', note: '司机通过 AGIORGO 充值。' },
          { slug: 'agiorcloud', note: '企业在 AGIORCLOUD 中管理账户。' },
          { slug: 'agior', note: '收费站 AGIOR 完成通行扣费。' },
        ],
        callout: {
          title: 'CAVACASH 本身不是金融机构',
          body: '账户资金由本地合作银行存管，并由银行负责二级清算；CAVACASH 平台仅负责线上资金流的管理。',
        },
        extra: {
          title: '应用场景',
          items: ['高速公路收费 — 已上线', '加油站 — 规划中', '汽车维修厂 — 规划中', '其他 B2B 电子现金场景 — 规划中'],
        },
      },
    },
  },
  {
    slug: 'imarapower',
    mark: 'IP',
    name: 'IMARAPOWER',
    layer: 'station',
    accent: 'from-amber-400 to-orange-500',
    copy: {
      fr: {
        category: 'Stockage d’énergie intelligent',
        tagline: 'Plus de solaire, moins de diesel, une station toujours alimentée.',
        summary: 'Gestion intelligente de l’énergie (logiciel + matériel) combinant solaire et diesel pour les postes de péage.',
        overview: [
          'IMARAPOWER est une solution de gestion intelligente du stockage d’énergie, logicielle et matérielle, conçue pour les postes de péage.',
          'Des modules photovoltaïques OEM et des groupes électrogènes diesel OEM constituent l’alimentation principale ; des capteurs météo et d’irradiance alimentent les algorithmes qui pilotent la production diesel et solaire.',
        ],
        features: [
          { title: 'Pilotage hybride', body: 'Les algorithmes répartissent en continu la production entre solaire et diesel.' },
          { title: 'Capteurs météo & irradiance', body: 'Mesures locales pour anticiper la production solaire.' },
          { title: 'Moins de pertes', body: 'Optimisation de la consommation électrique de la station et réduction des pertes.' },
          { title: 'Maximum d’énergie verte', body: 'Priorité au solaire pour réduire la consommation de carburant.' },
        ],
        audiences: ['Concessionnaires', 'Exploitants de postes de péage'],
        links: [
          { slug: 'aeoms', note: 'Alimente les terminaux AEOMS.' },
          { slug: 'agior', note: 'Assure la continuité des serveurs AGIOR.' },
        ],
        extra: {
          title: 'Composants',
          items: ['Modules photovoltaïques OEM', 'Groupes électrogènes diesel OEM', 'Capteurs météo et d’irradiance', 'Logiciel de pilotage énergétique'],
        },
      },
      en: {
        category: 'Smart energy storage',
        tagline: 'More solar, less diesel, a station that stays powered.',
        summary: 'Smart energy storage management (software + hardware) combining solar and diesel for toll stations.',
        overview: [
          'IMARAPOWER is a smart energy storage management solution — software and hardware — built for toll stations.',
          'OEM photovoltaic modules and OEM diesel generators provide the main power, while weather and irradiance sensors feed the algorithms that control diesel and solar output.',
        ],
        features: [
          { title: 'Hybrid control', body: 'Algorithms continuously balance output between solar and diesel.' },
          { title: 'Weather & irradiance sensors', body: 'On-site measurements to anticipate solar production.' },
          { title: 'Lower losses', body: 'Optimizes station power use and reduces losses.' },
          { title: 'Maximum green energy', body: 'Solar first, to cut fuel consumption.' },
        ],
        audiences: ['Concessionaires', 'Toll station operators'],
        links: [
          { slug: 'aeoms', note: 'Powers AEOMS terminals.' },
          { slug: 'agior', note: 'Keeps AGIOR servers running.' },
        ],
        extra: {
          title: 'Components',
          items: ['OEM photovoltaic modules', 'OEM diesel generators', 'Weather and irradiance sensors', 'Energy control software'],
        },
      },
      zh: {
        category: '智慧储能管理',
        tagline: '多用光伏，少烧柴油，收费站持续供电。',
        summary: '软硬件一体的智慧储能管理系统，协同光伏与柴油发电，为收费站供电。',
        overview: [
          'IMARAPOWER 是面向收费站的软硬件一体化智慧储能管理系统。',
          '以 OEM 光伏组件和 OEM 柴油发电机作为主电源，配合气象与辐照传感器，由软件算法控制柴油与光伏的出力。',
        ],
        features: [
          { title: '混合调度', body: '算法实时调度光伏与柴油发电出力。' },
          { title: '气象与辐照传感', body: '现场数据用于预判光伏发电量。' },
          { title: '降低损耗', body: '优化收费站用电，减少能量损耗。' },
          { title: '绿电最大化', body: '光伏优先，降低燃油消耗。' },
        ],
        audiences: ['特许经营方', '收费站运营方'],
        links: [
          { slug: 'aeoms', note: '为 AEOMS 终端供电。' },
          { slug: 'agior', note: '保障 AGIOR 服务器持续运行。' },
        ],
        extra: {
          title: '系统组成',
          items: ['OEM 光伏组件', 'OEM 柴油发电机', '气象与辐照传感器', '能源调度软件'],
        },
      },
    },
  },
];

export function getProduct(slug: ProductSlug): Product {
  const p = products.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown product ${slug}`);
  return p;
}
