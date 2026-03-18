'use server';

/**
 * Server Action to submit lead data to HubSpot CRM.
 * Requires HUBSPOT_ACCESS_TOKEN environment variable.
 */
export async function submitToHubSpot(data: {
  name: string;
  email: string;
  phone: string;
  courseInterest: string;
}) {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!accessToken) {
    console.error('HUBSPOT_ACCESS_TOKEN is not configured in environment variables.');
    return { success: false, error: 'Server configuration error.' };
  }

  try {
    const [firstname, ...lastnameParts] = data.name.trim().split(/\s+/);
    const lastname = lastnameParts.join(' ');

    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        properties: {
          email: data.email,
          firstname: firstname,
          lastname: lastname || '',
          phone: data.phone,
          // Mapping course interest to a standard or custom property
          // Using 'lifecyclestage' or a custom 'course_interest' property if exists
          // For now, we'll use 'notes' via associations or just standard properties
          jobtitle: `Interested in: ${data.courseInterest}`, 
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('HubSpot API Error:', errorData);
      return { success: false, error: errorData.message || 'Failed to sync with CRM.' };
    }

    return { success: true };
  } catch (error) {
    console.error('HubSpot Submission Exception:', error);
    return { success: false, error: 'Internal server error during CRM sync.' };
  }
}
