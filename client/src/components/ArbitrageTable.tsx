import React from 'react';
import { Opportunity } from '../types/common';

interface Props {
  opportunities: Opportunity[];
}

const ArbitrageTable: React.FC<Props> = ({ opportunities }) => {
  if (opportunities.length === 0) {
    return <div style={styles.empty}>No arbitrage opportunities found right now. Scanning...</div>;
  }

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th style={styles.th}>Asset</th>
            <th style={styles.th}>Buy At</th>
            <th style={styles.th}>Price (USDT)</th>
            <th style={styles.th}>Sell At</th>
            <th style={styles.th}>Price (USDT)</th>
            <th style={styles.th}>Spread</th>
            <th style={styles.th}>Profit %</th>
            <th style={styles.th}>Found At</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opp) => (
            <tr key={opp._id} style={styles.row}>
              <td style={styles.td}><strong>{opp.asset}</strong></td>
              <td style={{...styles.td, color: '#38a169'}}>{opp.buyExchange}</td>
              <td style={styles.td}>{opp.buyPrice.toFixed(4)}</td>
              <td style={{...styles.td, color: '#e53e3e'}}>{opp.sellExchange}</td>
              <td style={styles.td}>{opp.sellPrice.toFixed(4)}</td>
              <td style={styles.td}>{opp.spread.toFixed(4)}</td>
              <td style={{...styles.td, fontWeight: 'bold', color: '#3182ce'}}>
                {opp.profitPercentage.toFixed(2)}%
              </td>
              <td style={styles.td}>{new Date(opp.timestamp).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    overflowX: 'auto' as const,
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    borderRadius: '8px',
    background: 'white'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    minWidth: '600px',
  },
  thead: {
    backgroundColor: '#f7fafc',
    borderBottom: '2px solid #edf2f7',
  },
  th: {
    padding: '12px 15px',
    textAlign: 'left' as const,
    fontSize: '0.85rem',
    color: '#4a5568',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em'
  },
  row: {
    borderBottom: '1px solid #edf2f7',
    transition: 'background 0.2s'
  },
  td: {
    padding: '12px 15px',
    fontSize: '0.9rem',
    color: '#2d3748'
  },
  empty: {
    textAlign: 'center' as const,
    padding: '2rem',
    color: '#718096'
  }
};

export default ArbitrageTable;
