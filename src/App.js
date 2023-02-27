import { Route, Routes } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import Page404 from './pages/Page404';
import PageAbout from './pages/PageAbout';
import PageHome from './pages/PageHome';
import PagePost from './pages/PagePost';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="about/*" element={<PageAbout />} />
        <Route path="post/:postId" element={<PagePost />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

 export default App;


// import React, { useState, useEffect } from 'react';

// function App() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     document.title = `You clicked ${count} times`;
//   }, [count]);

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>Click me</button>
//     </div>
//   );
// }
// export default App;