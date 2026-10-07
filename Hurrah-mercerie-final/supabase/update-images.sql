-- ============================================================
-- Photos générées par IA (Higgsfield) pour 4 produits du catalogue.
-- À exécuter APRÈS seed-catalogue.sql, dans Supabase SQL Editor.
-- Rejouable sans risque (ignore ce qui est déjà en place).
-- Les 49 autres produits gardent l'image par défaut du site en
-- attendant soit une recharge de crédits Higgsfield, soit de
-- vraies photos que tu ajoutes toi-même depuis /admin/products.
-- ============================================================

insert into product_images (product_id, image_url, display_order)
select p.id, v.image_url, v.display_order
from (values
  ('HM-MAC-002'::text, 'https://d8j0ntlcm91z4.cloudfront.net/user_3HAXUpP1wE4wmGaEelPuD0JD2A1/hf_20260919_220530_7bae0727-6c11-4f54-87fd-28a8cda52334.png'::text, 0::integer),
  ('HM-MAC-003'::text, 'https://d8j0ntlcm91z4.cloudfront.net/user_3HAXUpP1wE4wmGaEelPuD0JD2A1/hf_20260919_215312_33b19e93-6b28-4fed-8e8a-891268066d18.png'::text, 0::integer),
  ('HM-FIL-001'::text, 'https://d8j0ntlcm91z4.cloudfront.net/user_3HAXUpP1wE4wmGaEelPuD0JD2A1/hf_20260919_214212_af4c5310-0801-4a87-a6f7-150d045e7a73.png'::text, 0::integer),
  ('HM-FIL-001'::text, 'https://d8j0ntlcm91z4.cloudfront.net/user_3HAXUpP1wE4wmGaEelPuD0JD2A1/hf_20260919_220541_3e9d99c8-edea-4529-bf2e-55872847b64a.png'::text, 1::integer)
) as v(reference, image_url, display_order)
join products p on p.reference = v.reference
where not exists (
  select 1 from product_images pi
  where pi.product_id = p.id and pi.image_url = v.image_url
);

-- On met en avant (page d'accueil) les produits qui ont déjà une vraie photo.
update products set featured = true
where reference in ('HM-MAC-002', 'HM-MAC-003', 'HM-FIL-001');
