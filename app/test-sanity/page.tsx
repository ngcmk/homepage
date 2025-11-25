"use client";

import { useEffect, useState } from "react";

export default function SanityTestPage() {
  const [status, setStatus] = useState<string>("Loading...");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const testSanity = async () => {
      try {
        // Test with direct fetch
        const response = await fetch(
          `https://l9cwvtr7.apicdn.sanity.io/v2025-11-24/data/query/production?query=${encodeURIComponent('*[_type == "post"]')}`
        );
        
        console.log('Response status:', response.status);
        const result = await response.json();
        console.log('Response:', result);
        
        if (result.result) {
          setStatus(`Found ${result.result.length} posts`);
          setData(result.result);
        } else {
          setStatus(`Error: ${result.error?.description || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Test error:', error);
        setStatus(`Error: ${error}`);
      }
    };

    testSanity();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Sanity Connection Test</h1>
      <p>Status: {status}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
