const Home = () => {
  return (
    <div className="previewLayout">
      <h1>Welcome! to Dining Management</h1>
      <h5 className="mb-0">
        BKash Payment: <span className="balanceCount">016********</span>
      </h5>
      <h5 className="mb-1 mt-1">
        Nagad Send Money: <span className="balanceCount">016********</span>
      </h5>
      {/* <h5 className="mb-4 mt-1"> */}
      <span
        className="c-red fw-bold mb-4 d-flex"
        style={{ backgroundColor: "#7767130" }}
      >
        Note: You must recharge at least 50 Taka. If the transaction number and
        mobile number are incorrect, the transaction will not be accepted, and a
        penalty may be imposed. To add balance, visit the profile menu below.
      </span>
    </div>
  );
};

export default Home;
