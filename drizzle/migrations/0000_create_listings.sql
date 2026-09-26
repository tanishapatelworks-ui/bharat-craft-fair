CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  city TEXT NOT NULL,
  description TEXT NOT NULL,
  contact TEXT NOT NULL,
  date_added TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.listings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.listings TO authenticated;
GRANT ALL ON public.listings TO service_role;

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read listings" ON public.listings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can add a listing" ON public.listings FOR INSERT TO anon, authenticated WITH CHECK (true);

INSERT INTO public.listings (name, category, city, description, contact) VALUES
('Meera''s Handloom Sarees', 'Textiles & Tailoring', 'Varanasi, Uttar Pradesh', 'Handwoven Banarasi silk sarees made on a traditional pit loom. Custom colors and blouse stitching available.', '919876543210'),
('Kumbhar Clay Studio', 'Pottery & Home Decor', 'Jaipur, Rajasthan', 'Terracotta planters, diyas, and dinner sets thrown by hand. Bulk orders for festivals and weddings welcome.', '919812345678'),
('Ammi''s Kitchen Snacks', 'Food & Snacks', 'Kochi, Kerala', 'Homemade banana chips, achappam, and spice mixes made in small batches. Ships across India.', '919845601234'),
('Ravi Woodworks', 'Woodwork', 'Saharanpur, Uttar Pradesh', 'Hand-carved sheesham wood furniture, toys, and kitchenware. Custom nameplates and gift items.', '919897654321'),
('Tara Bead Jewellery', 'Jewelry', 'Kolkata, West Bengal', 'Handcrafted terracotta and glass-bead necklaces, earrings, and bangles. Custom designs for occasions.', '919830112233'),
('Shanti Herbal Care', 'Beauty & Wellness', 'Dehradun, Uttarakhand', 'Small-batch herbal soaps, hair oils, and ubtan made with Himalayan herbs. No chemicals.', '919876102938');