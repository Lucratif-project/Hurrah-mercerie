-- ============================================================
-- Vague 4 : traduction anglaise (FR / EN)
-- À exécuter UNE fois dans Supabase > SQL Editor, AVANT de déployer le code.
-- Les colonnes *_en sont facultatives : si elles sont vides,
-- le site affiche automatiquement la version française.
-- ============================================================

alter table products     add column if not exists name_en        text;
alter table products     add column if not exists description_en text;
alter table products     add column if not exists color_en       text;
alter table products     add column if not exists size_en        text;
alter table products     add column if not exists format_en      text;

alter table categories   add column if not exists name_en        text;
alter table categories   add column if not exists description_en text;

alter table blog_posts   add column if not exists title_en       text;
alter table blog_posts   add column if not exists excerpt_en     text;
alter table blog_posts   add column if not exists content_en     text;

alter table bundles      add column if not exists name_en        text;
alter table bundles      add column if not exists description_en text;

alter table bundle_items add column if not exists label_en       text;

alter table social_posts add column if not exists caption_en     text;

-- ------------------------------------------------------------
-- Catégories du catalogue de démarrage
-- (seulement si la version anglaise n'a pas déjà été saisie)
-- ------------------------------------------------------------

update categories set name_en = 'Sewing machines', description_en = 'Home and industrial sewing machines.' where name = 'Machines' and name_en is null;
update categories set name_en = 'Threads & Yarns', description_en = 'Sewing and embroidery threads, plus yarns for all your projects.' where name = 'Fils & Laines' and name_en is null;
update categories set name_en = 'Duchess Satin', description_en = 'Duchess satin fabrics in a range of colours.' where name = 'Duchesse' and name_en is null;
update categories set name_en = 'Buttons', description_en = 'Buttons in all materials, sizes and colours.' where name = 'Boutons' and name_en is null;
update categories set name_en = 'Other Fabrics', description_en = 'Poplin and other everyday fabrics.' where name = 'Tissus complémentaires' and name_en is null;
update categories set name_en = 'Sewing Accessories', description_en = 'Needles, pins, scissors and small tools.' where name = 'Accessoires couture' and name_en is null;
update categories set name_en = 'Zips & Fasteners', description_en = 'Zips, snap buttons and hooks.' where name = 'Fermetures & attaches' and name_en is null;
update categories set name_en = 'Ribbons & Trims', description_en = 'Ribbons, lace and decorative braids.' where name = 'Rubans & décoration' and name_en is null;
update categories set name_en = 'Elastics', description_en = 'Sewing elastics in several widths.' where name = 'Élastiques' and name_en is null;
update categories set name_en = 'Interfacing & Reinforcement', description_en = 'Fusible interfacing and reinforcements.' where name = 'Entoilage & renfort' and name_en is null;

-- ------------------------------------------------------------
-- Produits du catalogue de démarrage (repérés par leur référence)
-- ------------------------------------------------------------
update products set name_en = 'Singer home sewing machine', description_en = 'Sturdy, easy-to-use treadle sewing machine for everyday sewing.', color_en = null, size_en = null, format_en = null where reference = 'HM-MAC-001' and name_en is null;
update products set name_en = 'Butterfly industrial sewing machine', description_en = 'Industrial sewing machine designed for heavy-duty sewing and thick fabrics.', color_en = null, size_en = null, format_en = null where reference = 'HM-MAC-002' and name_en is null;
update products set name_en = 'Sewing machine oil', description_en = 'Bottle of lubricating oil for regular maintenance of your sewing machine.', color_en = null, size_en = null, format_en = null where reference = 'HM-MAC-003' and name_en is null;
update products set name_en = 'Sewing thread - White', description_en = 'Spool of strong polyester sewing thread, white.', color_en = 'White', size_en = null, format_en = '200m spool' where reference = 'HM-FIL-001' and name_en is null;
update products set name_en = 'Sewing thread - Black', description_en = 'Spool of strong polyester sewing thread, black.', color_en = 'Black', size_en = null, format_en = '200m spool' where reference = 'HM-FIL-002' and name_en is null;
update products set name_en = 'Sewing thread - Red', description_en = 'Spool of strong polyester sewing thread, red.', color_en = 'Red', size_en = null, format_en = '200m spool' where reference = 'HM-FIL-003' and name_en is null;
update products set name_en = 'Sewing thread - Blue', description_en = 'Spool of strong polyester sewing thread, blue.', color_en = 'Blue', size_en = null, format_en = '200m spool' where reference = 'HM-FIL-004' and name_en is null;
update products set name_en = 'Sewing thread - Beige', description_en = 'Spool of strong polyester sewing thread, beige.', color_en = 'Beige', size_en = null, format_en = '200m spool' where reference = 'HM-FIL-005' and name_en is null;
update products set name_en = 'Sewing thread - Pink', description_en = 'Spool of strong polyester sewing thread, pink.', color_en = 'Pink', size_en = null, format_en = '200m spool' where reference = 'HM-FIL-006' and name_en is null;
update products set name_en = 'Multicolour embroidery thread', description_en = 'Assortment of brightly coloured embroidery threads, ideal for hand embroidery.', color_en = 'Multicolour', size_en = null, format_en = 'Spool' where reference = 'HM-FIL-007' and name_en is null;
update products set name_en = 'Elastic thread', description_en = 'Elastic thread for stretchy finishes and smocking.', color_en = null, size_en = null, format_en = 'Spool' where reference = 'HM-FIL-008' and name_en is null;
update products set name_en = 'Metallic embroidery thread', description_en = 'Metallic-effect embroidery thread for decorative finishes.', color_en = 'Gold', size_en = null, format_en = 'Spool' where reference = 'HM-FIL-009' and name_en is null;
update products set name_en = 'Knitting yarn - Red', description_en = 'Ball of knitting yarn, red.', color_en = 'Red', size_en = null, format_en = '100g ball' where reference = 'HM-LAI-001' and name_en is null;
update products set name_en = 'Knitting yarn - Blue', description_en = 'Ball of knitting yarn, blue.', color_en = 'Blue', size_en = null, format_en = '100g ball' where reference = 'HM-LAI-002' and name_en is null;
update products set name_en = 'Knitting yarn - Grey', description_en = 'Ball of knitting yarn, grey.', color_en = 'Grey', size_en = null, format_en = '100g ball' where reference = 'HM-LAI-003' and name_en is null;
update products set name_en = 'Knitting yarn - White', description_en = 'Ball of knitting yarn, white.', color_en = 'White', size_en = null, format_en = '100g ball' where reference = 'HM-LAI-004' and name_en is null;
update products set name_en = 'Polyester buttons (pack of 12)', description_en = 'Pack of 12 polyester buttons, available in several colours.', color_en = 'Assorted', size_en = null, format_en = 'Pack of 12' where reference = 'HM-BOU-001' and name_en is null;
update products set name_en = 'Wooden buttons (pack of 6)', description_en = 'Pack of 6 natural wood buttons with a handcrafted finish.', color_en = 'Natural wood', size_en = null, format_en = 'Pack of 6' where reference = 'HM-BOU-002' and name_en is null;
update products set name_en = 'Metal buttons (pack of 6)', description_en = 'Pack of 6 gold-tone metal buttons for jackets and coats.', color_en = 'Gold', size_en = null, format_en = 'Pack of 6' where reference = 'HM-BOU-003' and name_en is null;
update products set name_en = 'Crystal buttons (pack of 6)', description_en = 'Pack of 6 crystal-effect buttons for formal outfits.', color_en = 'Clear', size_en = null, format_en = 'Pack of 6' where reference = 'HM-BOU-004' and name_en is null;
update products set name_en = 'Coconut buttons (pack of 6)', description_en = 'Pack of 6 coconut shell buttons with a natural look.', color_en = 'Natural', size_en = null, format_en = 'Pack of 6' where reference = 'HM-BOU-005' and name_en is null;
update products set name_en = 'Snap buttons (pack of 10)', description_en = 'Pack of 10 metal snap buttons for quick fastening.', color_en = 'Silver', size_en = null, format_en = 'Pack of 10' where reference = 'HM-BOU-006' and name_en is null;
update products set name_en = 'Duchess satin fabric - Red', description_en = 'Duchess satin fabric with a fluid drape, sold by the metre.', color_en = 'Red', size_en = null, format_en = 'By the metre' where reference = 'HM-DUC-001' and name_en is null;
update products set name_en = 'Duchess satin fabric - Royal blue', description_en = 'Duchess satin fabric with a fluid drape, sold by the metre.', color_en = 'Royal blue', size_en = null, format_en = 'By the metre' where reference = 'HM-DUC-002' and name_en is null;
update products set name_en = 'Duchess satin fabric - Emerald green', description_en = 'Duchess satin fabric with a fluid drape, sold by the metre.', color_en = 'Emerald green', size_en = null, format_en = 'By the metre' where reference = 'HM-DUC-003' and name_en is null;
update products set name_en = 'Duchess satin fabric - Gold', description_en = 'Lustrous duchess satin fabric, sold by the metre.', color_en = 'Gold', size_en = null, format_en = 'By the metre' where reference = 'HM-DUC-004' and name_en is null;
update products set name_en = 'Duchess satin fabric - White', description_en = 'Duchess satin fabric, ideal for ceremonial outfits, sold by the metre.', color_en = 'White', size_en = null, format_en = 'By the metre' where reference = 'HM-DUC-005' and name_en is null;
update products set name_en = 'Plain poplin - White', description_en = 'Plain cotton poplin fabric, white, sold by the metre.', color_en = 'White', size_en = null, format_en = 'By the metre' where reference = 'HM-POP-001' and name_en is null;
update products set name_en = 'Plain poplin - Sky blue', description_en = 'Plain cotton poplin fabric, sky blue, sold by the metre.', color_en = 'Sky blue', size_en = null, format_en = 'By the metre' where reference = 'HM-POP-002' and name_en is null;
update products set name_en = 'Printed poplin', description_en = 'Poplin fabric with printed patterns, sold by the metre.', color_en = 'Printed', size_en = null, format_en = 'By the metre' where reference = 'HM-POP-003' and name_en is null;
update products set name_en = 'Hand sewing needles (pack)', description_en = 'Assorted pack of hand sewing needles in several sizes.', color_en = null, size_en = 'Assorted', format_en = 'Pack' where reference = 'HM-ACC-001' and name_en is null;
update products set name_en = 'Sewing machine needles (pack of 10)', description_en = 'Pack of 10 sewing machine needles, compatible with common models.', color_en = null, size_en = null, format_en = 'Pack of 10' where reference = 'HM-ACC-002' and name_en is null;
update products set name_en = 'Sewing pins (box)', description_en = 'Box of pins with heads for assembling and pattern making.', color_en = null, size_en = null, format_en = 'Box' where reference = 'HM-ACC-003' and name_en is null;
update products set name_en = 'Professional sewing scissors', description_en = 'Steel sewing scissors for a clean cut through fabric.', color_en = null, size_en = null, format_en = null where reference = 'HM-ACC-004' and name_en is null;
update products set name_en = 'Seam ripper', description_en = 'Seam ripper for neatly undoing stitches.', color_en = null, size_en = null, format_en = null where reference = 'HM-ACC-005' and name_en is null;
update products set name_en = 'Tailor''s tape measure', description_en = 'Flexible graduated tape measure for taking measurements.', color_en = null, size_en = null, format_en = null where reference = 'HM-ACC-006' and name_en is null;
update products set name_en = 'Sewing machine bobbins (pack of 5)', description_en = 'Pack of 5 bobbins compatible with home sewing machines.', color_en = null, size_en = null, format_en = 'Pack of 5' where reference = 'HM-ACC-007' and name_en is null;
update products set name_en = 'Thimble', description_en = 'Metal thimble to protect your finger while sewing.', color_en = null, size_en = null, format_en = null where reference = 'HM-ACC-008' and name_en is null;
update products set name_en = '20cm zip', description_en = 'Standard 20cm zip, available in several colours.', color_en = 'Assorted', size_en = null, format_en = null where reference = 'HM-FER-001' and name_en is null;
update products set name_en = '40cm zip', description_en = 'Long 40cm zip for jackets and bags.', color_en = 'Assorted', size_en = null, format_en = null where reference = 'HM-FER-002' and name_en is null;
update products set name_en = 'Metal snap buttons (pack of 12)', description_en = 'Pack of 12 metal snap buttons for quick fastening.', color_en = 'Silver', size_en = null, format_en = 'Pack of 12' where reference = 'HM-FER-003' and name_en is null;
update products set name_en = 'Hooks and eyes (set)', description_en = 'Set of metal hooks and eyes for finishing skirts and trousers.', color_en = null, size_en = null, format_en = 'Set' where reference = 'HM-FER-004' and name_en is null;
update products set name_en = 'Satin ribbon - Red', description_en = 'Roll of shiny satin ribbon, red.', color_en = 'Red', size_en = null, format_en = 'Roll' where reference = 'HM-RUB-001' and name_en is null;
update products set name_en = 'Satin ribbon - White', description_en = 'Roll of shiny satin ribbon, white.', color_en = 'White', size_en = null, format_en = 'Roll' where reference = 'HM-RUB-002' and name_en is null;
update products set name_en = 'Grosgrain ribbon - Black', description_en = 'Roll of textured grosgrain ribbon, black.', color_en = 'Black', size_en = null, format_en = 'Roll' where reference = 'HM-RUB-003' and name_en is null;
update products set name_en = 'Decorative lace', description_en = 'Decorative lace for finishes and embellishments, sold by the metre.', color_en = 'White', size_en = null, format_en = 'By the metre' where reference = 'HM-RUB-004' and name_en is null;
update products set name_en = 'Gold decorative braid', description_en = 'Gold decorative braid for premium finishes, sold by the metre.', color_en = 'Gold', size_en = null, format_en = 'By the metre' where reference = 'HM-RUB-005' and name_en is null;
update products set name_en = 'Flat elastic 2cm', description_en = 'Flat sewing elastic, 2cm wide, sold by the metre.', color_en = null, size_en = null, format_en = 'By the metre' where reference = 'HM-ELA-001' and name_en is null;
update products set name_en = 'Thin elastic 5mm', description_en = 'Thin elastic for light finishes, 5mm wide, sold by the metre.', color_en = null, size_en = null, format_en = 'By the metre' where reference = 'HM-ELA-002' and name_en is null;
update products set name_en = 'Wide elastic 4cm', description_en = 'Wide elastic for waistbands, 4cm wide, sold by the metre.', color_en = null, size_en = null, format_en = 'By the metre' where reference = 'HM-ELA-003' and name_en is null;
update products set name_en = 'Lightweight fusible interfacing', description_en = 'Lightweight fusible interfacing to stiffen collars and cuffs, sold by the metre.', color_en = null, size_en = null, format_en = 'By the metre' where reference = 'HM-ENT-001' and name_en is null;
update products set name_en = 'Heavyweight fusible interfacing', description_en = 'Heavyweight fusible interfacing for structured reinforcement, sold by the metre.', color_en = null, size_en = null, format_en = 'By the metre' where reference = 'HM-ENT-002' and name_en is null;
update products set name_en = 'Stiffening interlining', description_en = 'Reinforcing interlining for collars, waistbands and stiff finishes, sold by the metre.', color_en = null, size_en = null, format_en = 'By the metre' where reference = 'HM-ENT-003' and name_en is null;
