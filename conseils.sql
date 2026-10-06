-- ============================================================
-- Articles « Conseils couture » (français + anglais)
-- À exécuter dans Supabase > SQL Editor. Relançable : un article
-- déjà présent (même adresse) n'est pas dupliqué ni écrasé.
-- Mise en forme du contenu : "## " = sous-titre, "- " = liste.
-- ============================================================

insert into blog_posts (title, slug, excerpt, content, cover_image, status, title_en, excerpt_en, content_en)
values (
  $hm$Machine familiale ou industrielle : laquelle choisir ?$hm$,
  'choisir-machine-a-coudre',
  $hm$Les bonnes questions à se poser avant d'acheter sa machine à coudre, que vous débutiez ou que vous ouvriez un atelier.$hm$,
  $hm$Acheter une machine à coudre est un investissement. Avant de choisir, posez-vous quatre questions simples.

## 1. Qu'allez-vous coudre ?
- Retouches, vêtements pour la famille, apprentissage : une machine familiale suffit largement.
- Production régulière pour des clients, tissus épais, longues journées de couture : une machine industrielle est plus adaptée.

## 2. Combien d'heures par jour ?
Une machine familiale est faite pour un usage de quelques heures. Une machine industrielle est construite pour tourner toute la journée, plus vite et plus longtemps, sans chauffer.

## 3. Avez-vous toujours du courant ?
Avec les coupures d'électricité, une machine mécanique à pédale (à pied) continue de fonctionner. Si vous choisissez une machine électrique, prévoyez une solution de secours.

## 4. Où allez-vous l'installer ?
Une machine industrielle est lourde, plus bruyante et demande une table dédiée. Une machine familiale se range plus facilement.

## Avant de payer, vérifiez
- Que le point est régulier sur une chute de tissu, à l'endroit comme à l'envers.
- Que la canette se remplit et se remet facilement.
- Que les aiguilles, canettes et pièces de rechange se trouvent facilement.
- Le bruit : un « clac » métallique inhabituel n'est pas bon signe.

## Notre conseil
Vous débutez ? Commencez par une machine familiale : elle est plus simple à prendre en main. Vous cousez pour des clients tous les jours ? Passez à l'industrielle.

Vous hésitez encore ? Écrivez-nous sur WhatsApp en nous disant ce que vous voulez coudre : nous vous orientons vers la bonne machine.$hm$,
  '/images/machines/machine butterfly.jpeg',
  'published',
  $hm$Home or industrial sewing machine: which one should you choose?$hm$,
  $hm$The right questions to ask before buying a sewing machine, whether you are a beginner or opening a workshop.$hm$,
  $hm$A sewing machine is an investment. Before choosing, ask yourself four simple questions.

## 1. What will you sew?
- Alterations, clothes for the family, learning to sew: a home machine is more than enough.
- Regular production for customers, thick fabrics, long sewing days: an industrial machine is a better fit.

## 2. How many hours a day?
A home machine is designed for a few hours of use. An industrial machine is built to run all day, faster and longer, without overheating.

## 3. Do you always have electricity?
During power cuts, a mechanical treadle machine keeps working. If you choose an electric machine, plan a backup solution.

## 4. Where will you set it up?
An industrial machine is heavy, noisier and needs its own table. A home machine is easier to store.

## Before you pay, check
- That the stitch is even on a fabric scrap, on both sides.
- That the bobbin winds and fits back in easily.
- That needles, bobbins and spare parts are easy to find.
- The noise: an unusual metallic "clack" is not a good sign.

## Our advice
Just starting out? Begin with a home machine: it is easier to learn on. Sewing for customers every day? Go industrial.

Still unsure? Message us on WhatsApp and tell us what you want to sew: we will point you to the right machine.$hm$
)
on conflict (slug) do nothing;

insert into blog_posts (title, slug, excerpt, content, cover_image, status, title_en, excerpt_en, content_en)
values (
  $hm$Quelle aiguille machine pour quel tissu ?$hm$,
  'choisir-aiguille-machine',
  $hm$Points sautés, fil qui casse, tissu abîmé ? Le problème vient souvent de l'aiguille. Voici comment choisir la bonne taille.$hm$,
  $hm$L'aiguille est la pièce la moins chère de la machine, mais c'est elle qui fait la qualité du point.

## Lire la taille d'une aiguille
Une aiguille porte deux nombres, par exemple 80/12. Plus le nombre est grand, plus l'aiguille est grosse.

- 60/8 à 70/10 : tissus très fins (voile, mousseline, soie légère).
- 80/12 : tissus légers à moyens (popeline, coton de chemise, doublure).
- 90/14 : tissus moyens (coton épais, lin, satin et duchesse).
- 100/16 : tissus épais (jean, toile, plusieurs épaisseurs).
- 110/18 : tissus très épais (bâche, cuir souple, sacs).

## La pointe compte aussi
- Aiguille universelle : pour la plupart des tissus tissés.
- Aiguille à pointe boule ou « stretch » : pour les jerseys et tissus élastiques, elle écarte les fibres au lieu de les couper.
- Aiguille jean : pointe renforcée pour les tissus denses.

## Attention au modèle de machine
Les machines familiales et les machines industrielles n'utilisent pas le même type d'aiguille. Apportez une ancienne aiguille ou le nom de votre machine quand vous achetez.

## Quand changer l'aiguille ?
- Au début de chaque nouveau projet important.
- Après environ 8 heures de couture.
- Dès que vous entendez un petit « tac » à chaque point, que des points sautent ou que le fil casse.
- Si l'aiguille a touché une épingle.

Une aiguille neuve coûte peu et évite d'abîmer un tissu cher comme la duchesse.$hm$,
  '/images/categories/fils.jpeg',
  'published',
  $hm$Which machine needle for which fabric?$hm$,
  $hm$Skipped stitches, broken thread, damaged fabric? The needle is often the cause. Here is how to choose the right size.$hm$,
  $hm$The needle is the cheapest part of the machine, yet it makes the quality of the stitch.

## Reading a needle size
A needle has two numbers, for example 80/12. The higher the number, the thicker the needle.

- 60/8 to 70/10: very fine fabrics (voile, chiffon, light silk).
- 80/12: light to medium fabrics (poplin, shirting cotton, lining).
- 90/14: medium fabrics (heavy cotton, linen, satin and duchess satin).
- 100/16: thick fabrics (denim, canvas, several layers).
- 110/18: very thick fabrics (tarpaulin, soft leather, bags).

## The point matters too
- Universal needle: for most woven fabrics.
- Ballpoint or stretch needle: for jersey and stretch fabrics; it slides between the fibres instead of cutting them.
- Denim needle: reinforced point for dense fabrics.

## Check your machine model
Home and industrial machines do not use the same type of needle. Bring an old needle or the name of your machine when you shop.

## When should you change the needle?
- At the start of every important new project.
- After about 8 hours of sewing.
- As soon as you hear a small "tack" at each stitch, stitches are skipped or the thread breaks.
- If the needle has hit a pin.

A new needle costs little and protects expensive fabrics such as duchess satin.$hm$
)
on conflict (slug) do nothing;

insert into blog_posts (title, slug, excerpt, content, cover_image, status, title_en, excerpt_en, content_en)
values (
  $hm$Bien choisir son fil à coudre$hm$,
  'choisir-fil-a-coudre',
  $hm$Polyester, coton, fil à broder, fil élastique : quel fil utiliser, de quelle couleur, et combien de bobines prévoir.$hm$,
  $hm$Un bon fil évite les coutures qui lâchent et les casses pendant le travail.

## Quel fil pour quel usage ?
- Fil polyester : le plus polyvalent. Solide et légèrement souple, il convient à presque tous les tissus. C'est le bon choix si vous hésitez.
- Fil coton : pour les tissus en coton qui seront repassés très chauds ou teints après couture.
- Fil à broder : plus brillant, pour la broderie à la main ou les finitions décoratives.
- Fil métallisé : pour les effets brillants. Cousez lentement et utilisez une aiguille un peu plus grosse.
- Fil élastique : pour les fronces extensibles (smocks). Il se met uniquement dans la canette, enroulé à la main sans le tirer.

## Choisir la couleur
- Prenez une nuance légèrement plus foncée que le tissu : elle se voit moins qu'une nuance plus claire.
- Pour un tissu imprimé ou un pagne, choisissez la couleur dominante du motif.
- Pour une surpiqûre visible, osez un contraste.

## Tester la qualité
Tirez un bout de fil entre vos mains : un bon fil résiste, ne s'effiloche pas et ne fait pas de peluches.

## Combien de bobines ?
Comptez au moins une bobine de 200 m par vêtement simple (jupe, chemise). Prévoyez-en deux pour une grande tenue ou si vous surfilez beaucoup. Utilisez le même fil dessus et dans la canette.$hm$,
  '/images/categories/fils.jpeg',
  'published',
  $hm$How to choose the right sewing thread$hm$,
  $hm$Polyester, cotton, embroidery or elastic thread: which thread to use, in which colour, and how many spools you need.$hm$,
  $hm$Good thread prevents seams from coming apart and breaks while you work.

## Which thread for which use?
- Polyester thread: the most versatile. Strong with a little give, it suits almost every fabric. It is the right choice if you are unsure.
- Cotton thread: for cotton fabrics that will be ironed very hot or dyed after sewing.
- Embroidery thread: shinier, for hand embroidery or decorative finishes.
- Metallic thread: for shiny effects. Sew slowly and use a slightly larger needle.
- Elastic thread: for stretchy gathers (smocking). It only goes in the bobbin, wound by hand without stretching it.

## Choosing the colour
- Pick a shade slightly darker than the fabric: it shows less than a lighter one.
- For a printed fabric or wax print, choose the dominant colour of the pattern.
- For visible topstitching, go for a contrast.

## Testing quality
Pull a length of thread between your hands: good thread resists, does not fray and does not leave fluff.

## How many spools?
Plan at least one 200 m spool per simple garment (skirt, shirt). Take two for a large outfit or if you finish a lot of edges. Use the same thread on top and in the bobbin.$hm$
)
on conflict (slug) do nothing;

insert into blog_posts (title, slug, excerpt, content, cover_image, status, title_en, excerpt_en, content_en)
values (
  $hm$Duchesse, popeline : quel tissu choisir et combien de mètres acheter ?$hm$,
  'choisir-tissu-et-metrage',
  $hm$Les points forts de chaque tissu, les pièges à éviter et un repère simple pour ne plus acheter trop ou pas assez.$hm$,
  $hm$Le bon tissu dépend de la tenue que vous voulez créer et de votre niveau en couture.

## La duchesse
Tissu satiné, brillant et qui se tient bien. Idéale pour les robes de soirée, de mariage et les tenues de cérémonie.
- Placez les épingles dans les marges de couture : elles laissent des trous.
- Utilisez une aiguille neuve et fine.
- Repassez sur l'envers, fer tiède, avec un tissu de protection.
- Elle s'effiloche : finissez les bords rapidement.

## La popeline
Coton léger et régulier, facile à couper et à coudre. Parfaite pour les chemises, les doublures, les vêtements d'enfants et pour apprendre.
- Lavez-la avant de couper : le coton peut rétrécir au premier lavage.

## Combien de mètres ?
Cela dépend de la largeur du tissu, de la taille et du modèle. Pour un tissu d'environ 1,40 m de large, comptez à peu près :
- Jupe droite : 1 m à 1,20 m.
- Chemise à manches longues : 2 m à 2,50 m.
- Robe simple : 2,50 m à 3 m.
- Robe longue ou tenue de cérémonie : 3,50 m et plus.
- Ensemble complet en pagne : on compte souvent 6 yards, soit environ 5,50 m.

Ajoutez toujours 10 à 20 cm pour les raccords de motif et le rétrécissement. En cas de doute, montrez-nous votre modèle sur WhatsApp : nous vous aidons à calculer.$hm$,
  '/images/categories/duchesse.jpeg',
  'published',
  $hm$Duchess satin or poplin: which fabric to choose and how many metres to buy?$hm$,
  $hm$Each fabric's strengths, the pitfalls to avoid and a simple guide so you never buy too much or too little.$hm$,
  $hm$The right fabric depends on the outfit you want to make and on your sewing level.

## Duchess satin
A shiny satin fabric with good body. Ideal for evening and wedding dresses and ceremonial outfits.
- Put pins only in the seam allowances: they leave holes.
- Use a new, fine needle.
- Iron on the wrong side, at low heat, with a pressing cloth.
- It frays: finish the edges quickly.

## Poplin
A light, even cotton that is easy to cut and sew. Perfect for shirts, linings, children's clothes and for learning.
- Wash it before cutting: cotton can shrink the first time it is washed.

## How many metres?
It depends on the fabric width, the size and the pattern. For fabric about 1.40 m wide, allow roughly:
- Straight skirt: 1 m to 1.20 m.
- Long-sleeved shirt: 2 m to 2.50 m.
- Simple dress: 2.50 m to 3 m.
- Long dress or ceremonial outfit: 3.50 m or more.
- Full wax-print outfit: people often count 6 yards, about 5.50 m.

Always add 10 to 20 cm for pattern matching and shrinkage. If in doubt, show us your design on WhatsApp: we will help you work it out.$hm$
)
on conflict (slug) do nothing;

insert into blog_posts (title, slug, excerpt, content, cover_image, status, title_en, excerpt_en, content_en)
values (
  $hm$Entretenir sa machine à coudre : 6 gestes simples$hm$,
  'entretenir-machine-a-coudre',
  $hm$Une machine bien entretenue coud mieux et dure des années. Voici l'essentiel, sans outil compliqué.$hm$,
  $hm$La plupart des pannes viennent de la poussière, du manque d'huile ou d'une aiguille usée.

## 1. Enlever les peluches
Après chaque projet, retirez la plaque sous l'aiguille et la canette, puis brossez les peluches avec un petit pinceau. Évitez de souffler dedans : l'humidité de la bouche favorise la rouille.

## 2. Huiler avec la bonne huile
Utilisez uniquement de l'huile pour machine à coudre, jamais d'huile de cuisine ni d'huile de moteur. Une goutte suffit sur chaque point indiqué dans le mode d'emploi. Faites ensuite quelques coutures sur une chute pour absorber l'excès.
- Machine familiale : après environ 8 à 10 heures de couture.
- Machine industrielle : beaucoup plus souvent, suivez les indications du fabricant.

## 3. Changer l'aiguille
Une aiguille émoussée fait sauter les points et fatigue la machine. Changez-la régulièrement.

## 4. Protéger de l'humidité et de la poussière
Avec l'air humide et salé de la côte, la rouille arrive vite. Couvrez la machine après usage et rangez-la au sec.

## 5. Enfiler correctement
Enfilez toujours le fil avec le pied presseur relevé : sinon le fil ne passe pas bien dans la tension et les points sont mal serrés.

## 6. Ne pas tirer le tissu
Laissez la machine entraîner le tissu. Tirer dessus tord l'aiguille et peut la casser.

Pensez à garder un flacon d'huile et quelques aiguilles de rechange à portée de main.$hm$,
  '/images/machines/machine singer.jpeg',
  'published',
  $hm$Looking after your sewing machine: 6 simple habits$hm$,
  $hm$A well-maintained machine sews better and lasts for years. Here are the essentials, with no complicated tools.$hm$,
  $hm$Most breakdowns come from dust, a lack of oil or a worn needle.

## 1. Remove the lint
After each project, take off the plate under the needle and the bobbin, then brush out the lint with a small brush. Avoid blowing into it: the moisture from your breath encourages rust.

## 2. Oil with the right oil
Only use sewing machine oil, never cooking oil or engine oil. One drop is enough on each point shown in the manual. Then sew a few seams on a scrap to absorb the excess.
- Home machine: after about 8 to 10 hours of sewing.
- Industrial machine: much more often; follow the manufacturer's instructions.

## 3. Change the needle
A blunt needle skips stitches and strains the machine. Change it regularly.

## 4. Protect it from humidity and dust
With the humid, salty coastal air, rust sets in quickly. Cover the machine after use and store it somewhere dry.

## 5. Thread it correctly
Always thread with the presser foot raised: otherwise the thread does not sit properly in the tension discs and stitches are loose.

## 6. Do not pull the fabric
Let the machine feed the fabric. Pulling it bends the needle and can break it.

Keep a bottle of oil and a few spare needles close at hand.$hm$
)
on conflict (slug) do nothing;
