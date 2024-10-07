import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const FileReturnsPage = () => {
  const user = useSelector((state) => state.user);
  const listings = useSelector((state) => state.user.propertyList || []);

  const [selectedListing, setSelectedListing] = useState(null);
  const [paymentOption, setPaymentOption] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bankDetails, setBankDetails] = useState({ accountNumber: '', bankName: '' });
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    console.log('Listings:', listings);
  }, [listings]);

  const filteredListings = listings?.filter((listing) => 
    listing?.creator?._id === user?._id && listing?.status === 'notFiled'
  );

  useEffect(() => {
    console.log('Filtered Listings:', filteredListings);
  }, [filteredListings]);

  const handleListingChange = (event) => {
    const listingId = event.target.value;
    const listing = listings.find((listing) => listing._id === listingId);
    setSelectedListing(listing);
  };

  const handleMpesaPayment = async () => {
    try {
      const response = await fetch('/mpesa/c2bpayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          amount: (selectedListing.target * 0.012).toFixed(2),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPaymentStatus("Mpesa Payment Initiated. Please check your phone for the STK push.");
      } else {
        setPaymentStatus("Mpesa Payment Failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      setPaymentStatus("Mpesa Payment Failed: Network error");
    }
  };

  const handleVisaPayment = async () => {
    try {
      const response = await fetch('/visa/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bankDetails,
          amount: (selectedListing.target * 0.012).toFixed(2),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPaymentStatus("Visa Payment Successful");
      } else {
        setPaymentStatus("Visa Payment Failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      setPaymentStatus("Visa Payment Failed: Network error");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">File Returns</h1>
      {filteredListings && filteredListings.length === 0 ? (
        <p className="text-red-500">No listings available to file returns for.</p>
      ) : (
        <div>
          <label htmlFor="listingSelect" className="block mb-2">Select Listing:</label>
          <select 
            id="listingSelect" 
            onChange={handleListingChange}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Select a listing</option>
            {filteredListings.map((listing) => (
              <option key={listing._id} value={listing._id}>
                {listing.title} - Target: {listing.target}
              </option>
            ))}
          </select>

          {selectedListing && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Selected Listing: {selectedListing.title}</h3>

              <label htmlFor="paymentOption" className="block mb-2">Select Payment Option:</label>
              <select 
                id="paymentOption" 
                onChange={(e) => setPaymentOption(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              >
                <option value="">Select payment method</option>
                <option value="mpesa">Mpesa</option>
                <option value="visa">Visa</option>
              </select>

              {paymentOption === 'mpesa' && (
                <div>
                  <label htmlFor="phoneNumber" className="block mb-2">Enter Phone Number:</label>
                  <input
                    id="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <button 
                    onClick={handleMpesaPayment}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Pay with Mpesa
                  </button>
                </div>
              )}

              {paymentOption === 'visa' && (
                <div>
                  <label htmlFor="accountNumber" className="block mb-2">Account Number:</label>
                  <input
                    id="accountNumber"
                    type="text"
                    value={bankDetails.accountNumber}
                    onChange={(e) =>
                      setBankDetails({ ...bankDetails, accountNumber: e.target.value })
                    }
                    className="w-full p-2 border rounded mb-2"
                  />
                  <label htmlFor="bankName" className="block mb-2">Bank Name:</label>
                  <input
                    id="bankName"
                    type="text"
                    value={bankDetails.bankName}
                    onChange={(e) =>
                      setBankDetails({ ...bankDetails, bankName: e.target.value })
                    }
                    className="w-full p-2 border rounded mb-2"
                  />
                  <button 
                    onClick={handleVisaPayment}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Pay with Visa
                  </button>
                </div>
              )}
              <p className="mt-4 text-blue-600">{paymentStatus}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileReturnsPage;