import React, { useEffect, useState } from 'react';
import { Student_View_Bill } from '../../../api_Data/student_api';
import BackButton from '../../../components/BackButton';
import '../../../style/pages_css/dashboard/student_css/billPage.css';

function BillPage() {
  const [bills, setBills] = useState([]);

  // Fetch bills from the backend
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const billData = await Student_View_Bill();
        const billsData = billData.data || [];
        setBills(billsData);
      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    };

    fetchBills();
  }, []);

  return (
    <>
      <BackButton />

      <div className="bill-page-container">
        <h2>Student Bills</h2>
        <div className="bill-list">
          {bills.length > 0 ? (
            bills.map((bill) => (
              <div key={bill.id} className="bill-item">
                <h3>{bill.student.name.first_name} {bill.student.name.last_name}</h3>
                <p><strong>Email:</strong> {bill.student.name.username}</p>
                <p><strong>Class:</strong> {bill.student.class_id.name}</p>
                <p className="amount"><strong>Amount:</strong> {bill.amount}</p>
                <p><strong>Due Date:</strong> {new Date(bill.due_date).toLocaleDateString()}</p>
                <p><strong>Issued Date:</strong> {new Date(bill.bill_generated_at).toLocaleDateString()}</p>
                <p className={`paid-status ${bill.paid ? 'true' : 'false'}`}>
                  <strong>Paid:</strong> {bill.paid ? 'Yes' : 'No'}
                </p>
                {bill.paid && <p className="payment-date"><strong>Payment Date:</strong> {new Date(bill.payment_date).toLocaleDateString()}</p>}
              </div>
            ))
          ) : (
            <p>No bills available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default BillPage;
