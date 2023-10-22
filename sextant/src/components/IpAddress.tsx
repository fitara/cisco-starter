import { useState, useEffect } from 'react';
import axios from 'axios';

interface IpProps {
  version: string;
}

export default function IpAddress({ version }: IpProps) {
    const [ipAddress, setIpAddress] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get(`
          https://api.ipify.org?format=${version}`
        );
          setIpAddress(response.data);
      } catch (error) {
          console.error('Error fetching IP address:', error);
      }
      setLoading(false)
    };

    fetchIpAddress();
  }, [version]);

  return (
    <div className="ip-wrapper">
      {loading ? (
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      ) : (
        <div className="ip-content">
          <p className="ip-label">Public IP Address ({version}) :</p>
          <p className="ip-address">{ipAddress}</p>
        </div>
      )}
    </div>
  );
}