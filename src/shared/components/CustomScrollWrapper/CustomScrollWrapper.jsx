import 'overlayscrollbars/styles/overlayscrollbars.css';
import './CustomScrollWrapper.css';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import clsx from 'clsx';

const CustomScrollWrapper = ({ children, wrapClassName }) => {
  return (
    <OverlayScrollbarsComponent
      element="div"
      className={clsx('myScroll', wrapClassName && wrapClassName)}
      options={{
        scrollbars: { autoHide: 'never', theme: 'no-theme' },
      }}
      defer
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

export default CustomScrollWrapper;

// Приклад використання цієї бібліотеки:

// <div className={style.thumbExample}>
// <div className={style.someText}>
//   <p>
//     Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quos
//     deserunt esse sed architecto commodi nam fugiat minima cumque
//     sapiente quo, eveniet veritatis delectus illum explicabo
//     repudiandae. Aliquid, voluptate? Consectetur! Lorem ipsum dolor sit
//     amet consectetur adipisicing elit. Tenetur quo perspiciatis ut rerum
//     distinctio unde, laboriosam exercitationem laborum doloribus aliquid
//     ipsum reprehenderit quae iusto quam, officiis, molestiae illo sit
//     eius?
//   </p>
// </div>
// <div>
//   <CustomScrollWrapper>
//     <div className={style.scrollExample}>
//       <p>
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
//         iste asperiores hic magni facere totam nam quae exercitationem
//         perferendis beatae aliquid dolore reprehenderit esse non labore
//         alias modi, minus inventore! Lorem ipsum dolor sit amet
//         consectetur adipisicing elit. Laborum, deleniti. Natus nobis
//         temporibus, impedit dolorum omnis, praesentium quam, expedita
//         maiores incidunt magni veniam! Ipsam error ea, incidunt adipisci
//         esse eaque.
//       </p>
//     </div>
//   </CustomScrollWrapper>
// </div>
// </div>

// Стилі:
// .thumbExample {
//   display: flex;
//   justify-content: center;
//   gap: 20px;
// }

// .someText {
//   width: 672px;
// }

// .scrollExample {
//   width: 608px;
//   white-space: nowrap;
// }
