import ExpenseIncomePieChart from "./ExpenseIncomePieChart";
import MonthLineChart from "./MonthLineChart";
import YearLineChart from "./YearLineChart";

const AnalyticsPage = () => {
  return (
    <>
      <h2 className="previewLayout">Analytics</h2>
      {/* <AsDataRangePicker /> */}
      <h4 className="ml-4 mb-0 tac">Analytics By Date Range</h4>
      <div style={{ width: "100vw", height: "300px" }}>
        <ExpenseIncomePieChart />
      </div>
      <h4 className="ml-4 mb-0 tac">Analytics By Days</h4>
      <div style={{ width: "90vw", height: "500px" }}>
        <MonthLineChart />
      </div>
      <h4 className="ml-4 mb-0 tac">Analytics By Months</h4>
      <div style={{ width: "90vw", height: "500px" }}>
        <YearLineChart />
      </div>
    </>
  );
};

export default AnalyticsPage;
