import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Heart,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  RefreshCw,
  Download,
  Eye,
  Filter,
  FileText,
  Shield
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CitizenshipApplication {
  id: string;
  membership_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  nationality: string;
  address: string;
  occupation: string;
  education: string;
  skills: string;
  motivation: string;
  criminal_record: string;
  agree_terms: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Donation {
  id: string;
  category: string;
  email?: string;
  clicked_at: string;
}

interface GovernmentApplication {
  id: string;
  position_id: string;
  position_title: string;
  department: string;
  applicant_name: string;
  applicant_email: string;
  applicant_contact?: string;
  qualifications: string;
  experience: string;
  vision: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const [applications, setApplications] = useState<CitizenshipApplication[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [governmentApplications, setGovernmentApplications] = useState<GovernmentApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<CitizenshipApplication | null>(null);
  const [selectedGovApplication, setSelectedGovApplication] = useState<GovernmentApplication | null>(null);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [applicationsResult, donationsResult, govApplicationsResult] = await Promise.all([
        supabase
          .from('citizenship_applications')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('donations')
          .select('*')
          .order('clicked_at', { ascending: false }),
        supabase
          .from('government_applications')
          .select('*')
          .order('created_at', { ascending: false })
      ]);

      if (applicationsResult.error) throw applicationsResult.error;
      if (donationsResult.error) throw donationsResult.error;
      if (govApplicationsResult.error) throw govApplicationsResult.error;

      setApplications(applicationsResult.data || []);
      setDonations(donationsResult.data || []);
      setGovernmentApplications(govApplicationsResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Set up real-time subscriptions
    const applicationsChannel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'citizenship_applications'
        },
        () => fetchData()
      )
      .subscribe();

    const donationsChannel = supabase
      .channel('donations-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'donations'
        },
        () => fetchData()
      )
      .subscribe();

    const govApplicationsChannel = supabase
      .channel('government-applications-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'government_applications' },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(applicationsChannel);
      supabase.removeChannel(donationsChannel);
      supabase.removeChannel(govApplicationsChannel);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'under_review':
        return 'secondary';
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('citizenship_applications')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Application status changed to ${status}`,
      });
      
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      });
    }
  };

  const updateGovernmentApplicationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('government_applications')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Government application status changed to ${status}`,
      });

      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update government application status",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const donationStats = {
    total: donations.length,
    categories: donations.reduce((acc, donation) => {
      acc[donation.category] = (acc[donation.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-montserrat text-verdis-blue mb-2">
              Verdis Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor citizenship applications and donation activities
            </p>
          </div>
          <Button onClick={fetchData} disabled={loading} className="verdis-button-primary">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="verdis-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-verdis-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-montserrat text-verdis-blue">
                {applications.length}
              </div>
              <p className="text-xs text-muted-foreground">
                {applications.filter(app => app.status === 'pending').length} pending review
              </p>
            </CardContent>
          </Card>

          <Card className="verdis-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Donation Clicks</CardTitle>
              <Heart className="h-4 w-4 text-verdis-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-montserrat text-verdis-blue">
                {donationStats.total}
              </div>
              <p className="text-xs text-muted-foreground">
                Total donation button clicks
              </p>
            </CardContent>
          </Card>

          <Card className="verdis-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-verdis-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-montserrat text-verdis-blue">
                {applications.length > 0 
                  ? Math.round((applications.filter(app => app.status === 'approved').length / applications.length) * 100)
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Applications approved
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Citizenship Applications
            </TabsTrigger>
            <TabsTrigger value="government" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Government Applications
            </TabsTrigger>
            <TabsTrigger value="donations" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Donation Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Applications List */}
              <div className="lg:col-span-2">
                <Card className="verdis-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-verdis-blue" />
                      Recent Applications
                    </CardTitle>
                    <CardDescription>
                      Click on an application to view details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[600px]">
                      <div className="space-y-2 p-6">
                        {applications.map((app) => (
                          <div
                            key={app.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                            onClick={() => setSelectedApplication(app)}
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold">
                                  {app.first_name} {app.last_name}
                                </h4>
                               <Badge variant={getStatusColor(app.status)}>
                                  {app.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {app.email} • {app.nationality}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(app.created_at)}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        {applications.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            No applications found
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Application Details */}
              <div className="lg:col-span-1">
                {selectedApplication ? (
                  <Card className="verdis-card">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Application Details
                        <Badge variant={getStatusColor(selectedApplication.status)}>
                          {selectedApplication.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        ID: {selectedApplication.membership_id}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ScrollArea className="h-[500px] pr-4">
                        <div className="space-y-4">
                          {/* Personal Information */}
                          <div>
                            <h4 className="font-semibold text-verdis-blue mb-2 flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              Personal Information
                            </h4>
                            <div className="space-y-2 text-sm">
                              <p><strong>Name:</strong> {selectedApplication.first_name} {selectedApplication.last_name}</p>
                              <p className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {selectedApplication.email}
                              </p>
                              <p className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {selectedApplication.phone}
                              </p>
                              <p className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Born: {selectedApplication.date_of_birth}
                              </p>
                              <p><strong>Nationality:</strong> {selectedApplication.nationality}</p>
                              <p className="flex items-start gap-1">
                                <MapPin className="w-3 h-3 mt-0.5" />
                                {selectedApplication.address}
                              </p>
                            </div>
                          </div>

                          {/* Professional Information */}
                          <div>
                            <h4 className="font-semibold text-verdis-blue mb-2 flex items-center gap-2">
                              <Briefcase className="w-4 h-4" />
                              Professional Background
                            </h4>
                            <div className="space-y-2 text-sm">
                              <p><strong>Occupation:</strong> {selectedApplication.occupation}</p>
                              <p className="flex items-center gap-1">
                                <GraduationCap className="w-3 h-3" />
                                {selectedApplication.education}
                              </p>
                              <p><strong>Skills:</strong></p>
                              <p className="text-xs bg-muted p-2 rounded">
                                {selectedApplication.skills}
                              </p>
                            </div>
                          </div>

                          {/* Application Details */}
                          <div>
                            <h4 className="font-semibold text-verdis-blue mb-2">
                              Motivation & Background
                            </h4>
                            <div className="space-y-2 text-sm">
                              <p><strong>Motivation:</strong></p>
                              <p className="text-xs bg-muted p-2 rounded">
                                {selectedApplication.motivation}
                              </p>
                              <p><strong>Criminal Record:</strong> {selectedApplication.criminal_record}</p>
                              <p><strong>Terms Agreed:</strong> {selectedApplication.agree_terms ? 'Yes' : 'No'}</p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="space-y-2 pt-4 border-t">
                            <h4 className="font-semibold text-verdis-blue mb-2">Actions</h4>
                            <div className="flex flex-col gap-2">
                              <Button
                                size="sm"
                                variant="verdis-outline"
                                onClick={() => updateApplicationStatus(selectedApplication.id, 'approved')}
                                disabled={selectedApplication.status === 'approved'}
                              >
                                Approve Application
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                                disabled={selectedApplication.status === 'rejected'}
                                className="border-red-200 text-red-600 hover:bg-red-50"
                              >
                                Reject Application
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateApplicationStatus(selectedApplication.id, 'pending')}
                                disabled={selectedApplication.status === 'pending'}
                              >
                                Mark as Pending
                              </Button>
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="verdis-card">
                    <CardContent className="flex items-center justify-center h-[600px] text-muted-foreground">
                      Select an application to view details
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="government" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Government Applications List */}
              <div className="lg:col-span-1">
                <Card className="h-[600px]">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Government Applications</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[520px]">
                      <div className="space-y-2 p-4">
                        {governmentApplications.map((app) => (
                          <Card 
                            key={app.id}
                            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                              selectedGovApplication?.id === app.id ? 'ring-2 ring-primary' : ''
                            }`}
                            onClick={() => setSelectedGovApplication(app)}
                          >
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <h4 className="font-semibold text-sm">{app.position_title}</h4>
                                <Badge 
                                  variant={getStatusColor(app.status)}
                                  className="text-xs"
                                >
                                  {app.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{app.department}</p>
                              <p className="text-xs text-muted-foreground">{app.applicant_name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(app.created_at)}
                              </p>
                            </div>
                          </Card>
                        ))}
                        {governmentApplications.length === 0 && (
                          <div className="text-center text-muted-foreground py-8">
                            No government applications yet
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Government Application Details */}
              <div className="lg:col-span-2">
                {selectedGovApplication ? (
                  <Card className="h-[600px]">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{selectedGovApplication.position_title} Application</CardTitle>
                          <p className="text-muted-foreground">{selectedGovApplication.department}</p>
                        </div>
                        <Badge variant={getStatusColor(selectedGovApplication.status)}>
                          {selectedGovApplication.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[450px]">
                        <div className="space-y-6">
                          {/* Applicant Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Applicant Details</h4>
                              <div className="space-y-2 text-sm">
                                <p><span className="font-medium">Name:</span> {selectedGovApplication.applicant_name}</p>
                                <p><span className="font-medium">Email:</span> {selectedGovApplication.applicant_email}</p>
                                {selectedGovApplication.applicant_contact && (
                                  <p><span className="font-medium">Contact:</span> {selectedGovApplication.applicant_contact}</p>
                                )}
                                <p><span className="font-medium">Applied:</span> {formatDate(selectedGovApplication.created_at)}</p>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          {/* Application Content */}
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2">Qualifications</h4>
                              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                {selectedGovApplication.qualifications}
                              </p>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">Relevant Experience</h4>
                              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                {selectedGovApplication.experience}
                              </p>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">Vision for the Role</h4>
                              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                {selectedGovApplication.vision}
                              </p>
                            </div>
                          </div>

                          <Separator />

                          {/* Action Buttons */}
                          <div className="flex gap-2 flex-wrap">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateGovernmentApplicationStatus(selectedGovApplication.id, 'under_review')}
                              disabled={selectedGovApplication.status === 'under_review'}
                            >
                              Under Review
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => updateGovernmentApplicationStatus(selectedGovApplication.id, 'approved')}
                              disabled={selectedGovApplication.status === 'approved'}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => updateGovernmentApplicationStatus(selectedGovApplication.id, 'rejected')}
                              disabled={selectedGovApplication.status === 'rejected'}
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="h-[600px] flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select a government application to view details</p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Donation Categories */}
              <Card className="verdis-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-verdis-blue" />
                    Donation Categories
                  </CardTitle>
                  <CardDescription>
                    Breakdown of donation clicks by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(donationStats.categories).map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category}</span>
                        <Badge variant="secondary">{count} clicks</Badge>
                      </div>
                    ))}
                    {Object.keys(donationStats.categories).length === 0 && (
                      <div className="text-center py-4 text-muted-foreground">
                        No donation clicks recorded yet
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Donations */}
              <Card className="verdis-card">
                <CardHeader>
                  <CardTitle>Recent Donation Activity</CardTitle>
                  <CardDescription>
                    Latest donation button clicks
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2 p-6">
                      {donations.slice(0, 20).map((donation) => (
                        <div key={donation.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{donation.category}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(donation.clicked_at)}
                            </p>
                          </div>
                          <Heart className="w-4 h-4 text-verdis-blue" />
                        </div>
                      ))}
                      {donations.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No donation activity recorded
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;