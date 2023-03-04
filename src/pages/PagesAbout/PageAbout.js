import { Link, Navigate, Route, Routes } from "react-router-dom";
import LayoutPage from "../../components/LayoutPage";
import PageMyself from "./PageMyself";
import PageHistory from "./PageHistory";
function PageAbout() {
  return (
    <LayoutPage>
      <h2>About เกี่ยวกับเรื่องของหมู่เฮา</h2>
      <p>
        <Link to="myself">Myself</Link>
      </p>
      <p>
        <Link to="history">History</Link>
      </p>
      <Routes>
        <Route path="myself"  element={ <PageMyself /> }  />
        <Route path="history"  element={ <PageHistory />}  />
        <Route path="/" element={<Navigate to="myself" replace={true} />} />
      </Routes>
    </LayoutPage>
  );
}

export default PageAbout;
