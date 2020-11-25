import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface PropsAvailabilityMarker {
  loading: boolean;
  success: boolean;
}

const AvailabilityMarker: React.FC<PropsAvailabilityMarker> = props => {
  const { loading, success } = props;
  if (loading) return <ClipLoader size="12" color={'var(--color-main-dark)'} />;
  return (
    <>
      {success ? (
        <i style={{ color: 'lightgreen' }} className="fas fa-check-circle"></i>
      ) : (
        <i style={{ color: 'red' }} className="fas fa-ban"></i>
      )}
    </>
  );
};

export default AvailabilityMarker;
