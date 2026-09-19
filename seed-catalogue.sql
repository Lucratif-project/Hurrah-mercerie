-- ============================================================
-- Catalogue de départ Hurrah Mercerie (catégories + ~50 produits)
-- Prix et stocks sont des ESTIMATIONS marché Cotonou à ajuster
-- depuis /admin/products une fois les vrais chiffres connus.
-- Aucune photo réelle : les fiches utilisent une image par défaut
-- en attendant que tu ajoutes les vraies photos (voir plan, point 4).
-- Ce script est rejouable sans risque (il ignore ce qui existe déjà).
-- À exécuter en une fois dans Supabase SQL Editor.
-- ============================================================

insert into categories (name, description)
select v.name, v.description from (values
  ('Machines'::text, 'Machines à coudre familiales et industrielles.'::text),
  ('Fils & Laines'::text, 'Fils à coudre, à broder et laines pour tous vos projets.'::text),
  ('Duchesse'::text, 'Tissus Duchesse et coloris disponibles.'::text),
  ('Boutons'::text, 'Boutons de toutes matières, tailles et couleurs.'::text),
  ('Tissus complémentaires'::text, 'Popeline et autres tissus courants.'::text),
  ('Accessoires couture'::text, 'Aiguilles, épingles, ciseaux et petit matériel.'::text),
  ('Fermetures & attaches'::text, 'Fermetures à glissière, boutons-pression et crochets.'::text),
  ('Rubans & décoration'::text, 'Rubans, dentelles et galons décoratifs.'::text),
  ('Élastiques'::text, 'Élastiques de confection en plusieurs largeurs.'::text),
  ('Entoilage & renfort'::text, 'Entoilage thermocollant et renforts.'::text)
) as v(name, description)
where not exists (select 1 from categories c where c.name = v.name);

insert into products (name, description, price, stock, status, category_id, reference, color, size, format)
select v.name, v.description, v.price, v.stock, 'published', c.id, v.reference, v.color, v.size, v.format
from (values
  ('Machine à coudre Singer Familiale'::text, 'Machine à coudre à pédale, robuste et simple d''utilisation, pour les travaux de couture du quotidien.'::text, 85000::integer, 5::integer, 'Machines'::text, 'HM-MAC-001'::text, null::text, null::text, null::text),
  ('Machine à coudre Butterfly Industrielle'::text, 'Machine à coudre industrielle, adaptée aux travaux de couture intensifs et aux tissus épais.'::text, 85000::integer, 3::integer, 'Machines'::text, 'HM-MAC-002'::text, null::text, null::text, null::text),
  ('Huile pour machine à coudre'::text, 'Flacon d''huile lubrifiante pour l''entretien régulier de votre machine à coudre.'::text, 1500::integer, 30::integer, 'Machines'::text, 'HM-MAC-003'::text, null::text, '100ml'::text, null::text),
  ('Fil à coudre - Blanc'::text, 'Bobine de fil à coudre polyester résistant, coloris blanc.'::text, 300::integer, 60::integer, 'Fils & Laines'::text, 'HM-FIL-001'::text, 'Blanc'::text, null::text, 'Bobine 200m'::text),
  ('Fil à coudre - Noir'::text, 'Bobine de fil à coudre polyester résistant, coloris noir.'::text, 300::integer, 60::integer, 'Fils & Laines'::text, 'HM-FIL-002'::text, 'Noir'::text, null::text, 'Bobine 200m'::text),
  ('Fil à coudre - Rouge'::text, 'Bobine de fil à coudre polyester résistant, coloris rouge.'::text, 300::integer, 45::integer, 'Fils & Laines'::text, 'HM-FIL-003'::text, 'Rouge'::text, null::text, 'Bobine 200m'::text),
  ('Fil à coudre - Bleu'::text, 'Bobine de fil à coudre polyester résistant, coloris bleu.'::text, 300::integer, 45::integer, 'Fils & Laines'::text, 'HM-FIL-004'::text, 'Bleu'::text, null::text, 'Bobine 200m'::text),
  ('Fil à coudre - Beige'::text, 'Bobine de fil à coudre polyester résistant, coloris beige.'::text, 300::integer, 40::integer, 'Fils & Laines'::text, 'HM-FIL-005'::text, 'Beige'::text, null::text, 'Bobine 200m'::text),
  ('Fil à coudre - Rose'::text, 'Bobine de fil à coudre polyester résistant, coloris rose.'::text, 300::integer, 35::integer, 'Fils & Laines'::text, 'HM-FIL-006'::text, 'Rose'::text, null::text, 'Bobine 200m'::text),
  ('Fil à broder multicolore'::text, 'Assortiment de fils à broder aux couleurs vives, idéal pour la broderie main.'::text, 500::integer, 40::integer, 'Fils & Laines'::text, 'HM-FIL-007'::text, 'Multicolore'::text, null::text, 'Bobine'::text),
  ('Fil élastique'::text, 'Fil élastique pour finitions extensibles et smocks.'::text, 700::integer, 25::integer, 'Fils & Laines'::text, 'HM-FIL-008'::text, null::text, null::text, 'Bobine'::text),
  ('Fil à broder métallisé'::text, 'Fil à broder à effet métallisé pour finitions décoratives.'::text, 800::integer, 15::integer, 'Fils & Laines'::text, 'HM-FIL-009'::text, 'Doré'::text, null::text, 'Bobine'::text),
  ('Laine à tricoter - Rouge'::text, 'Pelote de laine à tricoter, coloris rouge.'::text, 900::integer, 20::integer, 'Fils & Laines'::text, 'HM-LAI-001'::text, 'Rouge'::text, null::text, 'Pelote 100g'::text),
  ('Laine à tricoter - Bleu'::text, 'Pelote de laine à tricoter, coloris bleu.'::text, 900::integer, 20::integer, 'Fils & Laines'::text, 'HM-LAI-002'::text, 'Bleu'::text, null::text, 'Pelote 100g'::text),
  ('Laine à tricoter - Gris'::text, 'Pelote de laine à tricoter, coloris gris.'::text, 900::integer, 18::integer, 'Fils & Laines'::text, 'HM-LAI-003'::text, 'Gris'::text, null::text, 'Pelote 100g'::text),
  ('Laine à tricoter - Blanc'::text, 'Pelote de laine à tricoter, coloris blanc.'::text, 900::integer, 22::integer, 'Fils & Laines'::text, 'HM-LAI-004'::text, 'Blanc'::text, null::text, 'Pelote 100g'::text),
  ('Boutons polyester (lot de 12)'::text, 'Lot de 12 boutons en polyester, plusieurs coloris disponibles.'::text, 500::integer, 60::integer, 'Boutons'::text, 'HM-BOU-001'::text, 'Assorti'::text, null::text, 'Lot de 12'::text),
  ('Boutons bois (lot de 6)'::text, 'Lot de 6 boutons en bois naturel, finition artisanale.'::text, 800::integer, 40::integer, 'Boutons'::text, 'HM-BOU-002'::text, 'Bois naturel'::text, null::text, 'Lot de 6'::text),
  ('Boutons métal (lot de 6)'::text, 'Lot de 6 boutons en métal doré, pour vestes et manteaux.'::text, 1200::integer, 30::integer, 'Boutons'::text, 'HM-BOU-003'::text, 'Doré'::text, null::text, 'Lot de 6'::text),
  ('Boutons cristal (lot de 6)'::text, 'Lot de 6 boutons effet cristal, pour tenues habillées.'::text, 1500::integer, 25::integer, 'Boutons'::text, 'HM-BOU-004'::text, 'Transparent'::text, null::text, 'Lot de 6'::text),
  ('Boutons noix de coco (lot de 6)'::text, 'Lot de 6 boutons en noix de coco, aspect naturel.'::text, 1000::integer, 35::integer, 'Boutons'::text, 'HM-BOU-005'::text, 'Naturel'::text, null::text, 'Lot de 6'::text),
  ('Boutons-pression (lot de 10)'::text, 'Lot de 10 boutons-pression métal pour fermetures rapides.'::text, 1000::integer, 30::integer, 'Boutons'::text, 'HM-BOU-006'::text, 'Argenté'::text, null::text, 'Lot de 10'::text),
  ('Tissu Duchesse - Rouge'::text, 'Tissu Duchesse satiné, tombé fluide, vendu au mètre.'::text, 3500::integer, 20::integer, 'Duchesse'::text, 'HM-DUC-001'::text, 'Rouge'::text, null::text, 'Au mètre'::text),
  ('Tissu Duchesse - Bleu roi'::text, 'Tissu Duchesse satiné, tombé fluide, vendu au mètre.'::text, 3500::integer, 20::integer, 'Duchesse'::text, 'HM-DUC-002'::text, 'Bleu roi'::text, null::text, 'Au mètre'::text),
  ('Tissu Duchesse - Vert émeraude'::text, 'Tissu Duchesse satiné, tombé fluide, vendu au mètre.'::text, 3500::integer, 18::integer, 'Duchesse'::text, 'HM-DUC-003'::text, 'Vert émeraude'::text, null::text, 'Au mètre'::text),
  ('Tissu Duchesse - Or'::text, 'Tissu Duchesse satiné éclatant, vendu au mètre.'::text, 3800::integer, 15::integer, 'Duchesse'::text, 'HM-DUC-004'::text, 'Or'::text, null::text, 'Au mètre'::text),
  ('Tissu Duchesse - Blanc'::text, 'Tissu Duchesse satiné, idéal pour tenues de cérémonie, au mètre.'::text, 3500::integer, 22::integer, 'Duchesse'::text, 'HM-DUC-005'::text, 'Blanc'::text, null::text, 'Au mètre'::text),
  ('Popeline unie - Blanc'::text, 'Tissu popeline de coton uni, coloris blanc, vendu au mètre.'::text, 2500::integer, 25::integer, 'Tissus complémentaires'::text, 'HM-POP-001'::text, 'Blanc'::text, null::text, 'Au mètre'::text),
  ('Popeline unie - Bleu ciel'::text, 'Tissu popeline de coton uni, coloris bleu ciel, vendu au mètre.'::text, 2500::integer, 20::integer, 'Tissus complémentaires'::text, 'HM-POP-002'::text, 'Bleu ciel'::text, null::text, 'Au mètre'::text),
  ('Popeline imprimée'::text, 'Tissu popeline à motifs imprimés, vendu au mètre.'::text, 3000::integer, 15::integer, 'Tissus complémentaires'::text, 'HM-POP-003'::text, 'Imprimé'::text, null::text, 'Au mètre'::text),
  ('Aiguilles à coudre à la main (paquet)'::text, 'Paquet assorti d''aiguilles à coudre à la main, plusieurs tailles.'::text, 500::integer, 50::integer, 'Accessoires couture'::text, 'HM-ACC-001'::text, null::text, 'Assorti'::text, 'Paquet'::text),
  ('Aiguilles machine à coudre (lot de 10)'::text, 'Lot de 10 aiguilles pour machine à coudre, compatibles modèles courants.'::text, 1500::integer, 30::integer, 'Accessoires couture'::text, 'HM-ACC-002'::text, null::text, null::text, 'Lot de 10'::text),
  ('Épingles à coudre (boîte)'::text, 'Boîte d''épingles à tête pour l''assemblage et le patronage.'::text, 700::integer, 45::integer, 'Accessoires couture'::text, 'HM-ACC-003'::text, null::text, null::text, 'Boîte'::text),
  ('Ciseaux de couture professionnels'::text, 'Ciseaux de couture en acier, coupe nette pour tissus.'::text, 3500::integer, 20::integer, 'Accessoires couture'::text, 'HM-ACC-004'::text, null::text, '23cm'::text, null::text),
  ('Découseur'::text, 'Découseur pour défaire proprement les coutures.'::text, 1000::integer, 30::integer, 'Accessoires couture'::text, 'HM-ACC-005'::text, null::text, null::text, null::text),
  ('Mètre ruban de couturière'::text, 'Mètre ruban souple gradué pour la prise de mesures.'::text, 500::integer, 40::integer, 'Accessoires couture'::text, 'HM-ACC-006'::text, null::text, '150cm'::text, null::text),
  ('Canettes machine à coudre (lot de 5)'::text, 'Lot de 5 canettes compatibles machines à coudre familiales.'::text, 1200::integer, 25::integer, 'Accessoires couture'::text, 'HM-ACC-007'::text, null::text, null::text, 'Lot de 5'::text),
  ('Dé à coudre'::text, 'Dé à coudre en métal pour protéger le doigt pendant la couture.'::text, 500::integer, 30::integer, 'Accessoires couture'::text, 'HM-ACC-008'::text, null::text, null::text, null::text),
  ('Fermeture éclair 20cm'::text, 'Fermeture éclair standard 20cm, plusieurs coloris disponibles.'::text, 500::integer, 60::integer, 'Fermetures & attaches'::text, 'HM-FER-001'::text, 'Assorti'::text, '20cm'::text, null::text),
  ('Fermeture éclair 40cm'::text, 'Fermeture éclair longue 40cm, pour vestes et sacs.'::text, 700::integer, 40::integer, 'Fermetures & attaches'::text, 'HM-FER-002'::text, 'Assorti'::text, '40cm'::text, null::text),
  ('Boutons-pression métal (lot de 12)'::text, 'Lot de 12 boutons-pression métal pour fermetures rapides.'::text, 900::integer, 35::integer, 'Fermetures & attaches'::text, 'HM-FER-003'::text, 'Argenté'::text, null::text, 'Lot de 12'::text),
  ('Crochets et portes (lot)'::text, 'Lot de crochets et portes métalliques pour finitions de jupes et pantalons.'::text, 600::integer, 30::integer, 'Fermetures & attaches'::text, 'HM-FER-004'::text, null::text, null::text, 'Lot'::text),
  ('Ruban satin - Rouge'::text, 'Rouleau de ruban satin brillant, coloris rouge.'::text, 1000::integer, 25::integer, 'Rubans & décoration'::text, 'HM-RUB-001'::text, 'Rouge'::text, null::text, 'Rouleau'::text),
  ('Ruban satin - Blanc'::text, 'Rouleau de ruban satin brillant, coloris blanc.'::text, 1000::integer, 25::integer, 'Rubans & décoration'::text, 'HM-RUB-002'::text, 'Blanc'::text, null::text, 'Rouleau'::text),
  ('Ruban gros-grain - Noir'::text, 'Rouleau de ruban gros-grain texturé, coloris noir.'::text, 1200::integer, 20::integer, 'Rubans & décoration'::text, 'HM-RUB-003'::text, 'Noir'::text, null::text, 'Rouleau'::text),
  ('Dentelle décorative'::text, 'Dentelle décorative pour finitions et embellissements, au mètre.'::text, 1500::integer, 20::integer, 'Rubans & décoration'::text, 'HM-RUB-004'::text, 'Blanc'::text, null::text, 'Au mètre'::text),
  ('Galon décoratif doré'::text, 'Galon décoratif doré pour finitions haut de gamme, au mètre.'::text, 1800::integer, 15::integer, 'Rubans & décoration'::text, 'HM-RUB-005'::text, 'Doré'::text, null::text, 'Au mètre'::text),
  ('Élastique plat 2cm'::text, 'Élastique plat de confection, largeur 2cm, au mètre.'::text, 400::integer, 50::integer, 'Élastiques'::text, 'HM-ELA-001'::text, null::text, '2cm'::text, 'Au mètre'::text),
  ('Élastique fin 5mm'::text, 'Élastique fin pour finitions légères, largeur 5mm, au mètre.'::text, 300::integer, 50::integer, 'Élastiques'::text, 'HM-ELA-002'::text, null::text, '5mm'::text, 'Au mètre'::text),
  ('Élastique large 4cm'::text, 'Élastique large pour ceintures, largeur 4cm, au mètre.'::text, 600::integer, 30::integer, 'Élastiques'::text, 'HM-ELA-003'::text, null::text, '4cm'::text, 'Au mètre'::text),
  ('Entoilage thermocollant léger'::text, 'Entoilage thermocollant léger pour rigidifier cols et poignets, au mètre.'::text, 1200::integer, 25::integer, 'Entoilage & renfort'::text, 'HM-ENT-001'::text, null::text, null::text, 'Au mètre'::text),
  ('Entoilage thermocollant épais'::text, 'Entoilage thermocollant épais pour renforts structurés, au mètre.'::text, 1500::integer, 20::integer, 'Entoilage & renfort'::text, 'HM-ENT-002'::text, null::text, null::text, 'Au mètre'::text),
  ('Renfort / triplure'::text, 'Triplure de renfort pour cols, ceintures et finitions rigides, au mètre.'::text, 1300::integer, 15::integer, 'Entoilage & renfort'::text, 'HM-ENT-003'::text, null::text, null::text, 'Au mètre'::text)
) as v(name, description, price, stock, category_name, reference, color, size, format)
join categories c on c.name = v.category_name
where not exists (select 1 from products p where p.reference = v.reference);