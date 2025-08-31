-- Create government applications table
CREATE TABLE public.government_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  position_id TEXT NOT NULL,
  position_title TEXT NOT NULL,
  department TEXT NOT NULL,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_contact TEXT,
  qualifications TEXT NOT NULL,
  experience TEXT NOT NULL,
  vision TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.government_applications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can create government applications" 
ON public.government_applications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view government applications" 
ON public.government_applications 
FOR SELECT 
USING (true);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_government_applications_updated_at
BEFORE UPDATE ON public.government_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime
ALTER TABLE public.government_applications REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.government_applications;