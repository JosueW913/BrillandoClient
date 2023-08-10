import logo from '../images/logo.png'

const HomePage = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="content">
          <div className="col1">
          <img src={logo} alt="logo" />
          <h1>Where Fun and Learning <span className="homeSpan">SHINE</span> Together!</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet risus erat. Aliquam facilisis fermentum nunc, non cursus est convallis eu. Praesent eu malesuada quam, ut ultrices augue. Aenean semper mauris vel justo consectetur, et dictum leo sagittis. Donec mattis mauris eget nibh consequat rutrum. Quisque commodo scelerisque velit in hendrerit. Vivamus at libero consequat magna imperdiet dapibus nec eget eros. Mauris porta enim quis tincidunt lacinia. Vivamus.
            </p>
          </div>

          <div className="col2">
            <img src="https://www.scholastic.com/content/dam/parents/OptimizedDesignImages/Batch2/Articles/4-3ratio/finger-painting-toddlers-debunking-my-own-myths-article-4-3.jpg" alt="finger-paint" />

            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj_gTRksfdFVL37xy3jiIDUwC2SzQ349HJwQ&usqp=CAU" alt="rocket-crafts" />

            <img src="https://www.fargomoorhead.org/wp-content/uploads/2019/06/AdobeStock_118516528-e1559744022425.jpeg" alt="reading" />

          </div>

        </div>
      </div>
    </div>
  )
}

export default HomePage