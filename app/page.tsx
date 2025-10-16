// app/page.tsx
import { headers } from 'next/headers';

interface KBData {
  orgName?: string;
  kbId: string;
  articles?: any[];
  description?: string;
  [key: string]: any;
}

async function fetchKnowledgeBase(kbId: string): Promise<KBData> {
  try {
    const response = await fetch(`https://beta-api.rhinontech.com/api/kb/${kbId}`, {
      cache: 'no-store', // Don't cache during development
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`KB not found: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error fetching KB:', error);
    throw new Error('Knowledge Base not found');
  }
}

export default async function Home() {
  // Get the host from headers
  const headersList = await headers();
  const host = headersList.get('host') || '';
  
  // Extract KB ID from subdomain
  // Example: 5782138bvjsbdg891b.rhinon.help -> 5782138bvjsbdg891b
  const kbId = host.split('.')[0];
  
  // Check if it's a subdomain (not main domain)
  const isSubdomain = host.split('.').length > 2;
  
  // Main domain - show landing page
  if (!isSubdomain) {
    return (
      <div style={{ 
        padding: '40px', 
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Welcome to rhinon.help
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          Access your organization's knowledge base using:
        </p>
        <code style={{ 
          display: 'block',
          background: '#f4f4f4', 
          padding: '20px', 
          marginTop: '20px',
          borderRadius: '8px',
          fontSize: '1.1rem'
        }}>
          YOUR-KB-ID.rhinon.help
        </code>
      </div>
    );
  }
  
  // Subdomain - fetch and display KB
  try {
    const kbData = await fetchKnowledgeBase(kbId);
    
  } catch (error) {
    console.log("No kb");
    
  }
}