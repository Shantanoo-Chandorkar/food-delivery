import React, { useState } from 'react';

const LightAndDarkToggle = () => {
  const [mode, setmode] = useState("dark");

  const toggleMode = () => {
    if (mode === "light") {
      setmode("dark");
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      setmode("light");
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  };
  return (
    <div>
      <button className='btn' onClick={toggleMode} id="flexSwitchCheckDefault">
        {mode === "light" ? "Dark" : "Light"}
      </button>
    </div>
  )
}

export default LightAndDarkToggle


// import React, { useState } from 'react';

// const LightAndDarkToggle = () => {
//   // document.getElementById('btnSwitch').addEventListener('click', () => {
//   //   if (document.documentElement.getAttribute('data-bs-theme') === 'dark') {
//   //     document.documentElement.setAttribute('data-bs-theme', 'light')
//   //   }
//   //   else {
//   //     document.documentElement.setAttribute('data-bs-theme', 'dark')
//   //   }
//   // })

//   const [toggle, setToggle] = useState("dark");

//   const handleToogle = () => {
//     if (document.documentElement.getAttribute('data-bs-theme') === 'dark') {
//       document.documentElement.setAttribute('data-bs-theme', 'light')
//     }
//     else {
//       document.documentElement.setAttribute('data-bs-theme', 'dark')
//     }
//   }

//   return (

//     <button className='btn btn-dark shadow' id='btnSwitch' onClick={handleToogle}> Toggle Mode</button>
//   )
// }

// export default LightAndDarkToggle