import React from 'react';
import Header from './components/Header';
import ArbitrageTable from './components/ArbitrageTable';
import { useArbitrageData } from './hooks/useArbitrageData';

const App: React.FC = () => {
  const { opportunities, stats, loading, error } = useArbitrageData();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f7fafc', minHeight: '100vh' }}>
      <Header />
      
      <main style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
        {error && (
          <div style={{ padding: '1rem', backgroundColor: '#fed7d7', color: '#c53030', borderRadius: '4px', marginBottom: '1rem' }}>
            Error: {error}. Is the backend server running?
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Total Opportunities</h3>
            <p style={cardValueStyle}>{stats?.totalOpportunitiesFound || 0}</p>
          </div>
          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Best Profit Found</h3>
            <p style={{...cardValueStyle, color: '#38a169'}}>
              {stats?.topOpportunity ? `${stats.topOpportunity.profitPercentage.toFixed(2)}%` : '0.00%'}
            </p>
            {stats?.topOpportunity ? (
                <div style={{ fontSize: '0.85rem', color: '#718096', marginTop: '0.5rem' }}>
                    <strong>{stats.topOpportunity.asset}</strong><br/>
                    <span style={{ color: '#38a169' }}>Buy {stats.topOpportunity.buyExchange}</span> / <span style={{ color: '#e53e3e' }}>Sell {stats.topOpportunity.sellExchange}</span><br/>
                    <small>at {new Date(stats.topOpportunity.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</small>
                </div>
            ) : (
                <small style={{ color: '#718096' }}>-</small>
            )}
          </div>
          <div style={cardStyle}>
            <h3 style={cardTitleStyle}>Theoretical Profit (24h)</h3>
            <p style={{...cardValueStyle, color: '#2b6cb0'}}>
              ${stats?.theoreticalProfit ? stats.theoreticalProfit.toFixed(2) : '0.00'}
            </p>
            <small style={{ color: '#718096' }}>Based on $1k/trade</small>
          </div>
        </div>

        {loading && !opportunities.length ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading market data...</div>
        ) : (
          <ArbitrageTable opportunities={opportunities} />
        )}
      </main>
    </div>
  );
};

const cardStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
};

const cardTitleStyle = {
  margin: '0 0 0.5rem 0',
  fontSize: '0.9rem',
  color: '#718096',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em'
};

const cardValueStyle = {
  margin: 0,
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#2d3748'
};

export default App;
