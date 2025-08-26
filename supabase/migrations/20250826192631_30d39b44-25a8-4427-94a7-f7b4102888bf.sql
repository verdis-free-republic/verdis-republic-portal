-- Create citizenship applications table
CREATE TABLE public.citizenship_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  membership_id TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,  
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  nationality TEXT NOT NULL,
  address TEXT NOT NULL,
  occupation TEXT NOT NULL,
  education TEXT NOT NULL,
  skills TEXT NOT NULL,
  motivation TEXT NOT NULL,
  criminal_record TEXT NOT NULL,
  agree_terms BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create donations table
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  email TEXT,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.citizenship_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since these are public forms)
CREATE POLICY "Anyone can view applications" 
ON public.citizenship_applications 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create applications" 
ON public.citizenship_applications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view donations" 
ON public.donations 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create donations" 
ON public.donations 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_citizenship_applications_updated_at
BEFORE UPDATE ON public.citizenship_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_citizenship_applications_email ON public.citizenship_applications(email);
CREATE INDEX idx_citizenship_applications_status ON public.citizenship_applications(status);
CREATE INDEX idx_citizenship_applications_created_at ON public.citizenship_applications(created_at);
CREATE INDEX idx_donations_category ON public.donations(category);
CREATE INDEX idx_donations_clicked_at ON public.donations(clicked_at);