'use server';

/**
 * Server Action to submit lead data to HubSpot CRM.
 * Requires HUBSPOT_ACCESS_TOKEN environment variable.
 */
export async function submitToHubSpot(data: {
  name: string;
  email: string;
  phone: string;
  city: string;
  lead_source: string;
  courseInterest: string;
  consulation_date: string;
  consulation_time: string;
}) {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!accessToken) {
    console.error('HUBSPOT_ACCESS_TOKEN is not configured in environment variables.');
    return { success: false, error: 'Server configuration error.' };
  }

  function parseConsultationTimestamp(date: string, time: string) {
    if (!date || !time) {
      return null;
    }

    const dateTime = new Date(`${date}T${time}:00`);
    return Number.isNaN(dateTime.valueOf()) ? null : dateTime.valueOf();
  }

  try {
    const [firstname, ...lastnameParts] = data.name.trim().split(/\s+/);
    const lastname = lastnameParts.join(' ');
    const consultationTimestamp = parseConsultationTimestamp(data.consulation_date, data.consulation_time);

    const properties: Record<string, string | number> = {
      email: data.email,
      firstname: firstname,
      lastname: lastname || '',
      phone: data.phone,
      city: data.city,
      lead_source: data.lead_source,
      jobtitle: `Interested in: ${data.courseInterest}`,
      consulation_date: data.consulation_date,
    };

    if (consultationTimestamp !== null) {
      properties.consulation_time = consultationTimestamp;
    }

    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        properties,
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
