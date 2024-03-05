import bagr from '@/assets/images/banner/Rectangle_gradient.png'

const ProductSneakPeek = () => {
  return (
    <section
      className="pt-100 pb-100 mb-0"
      style={{
        background: `url('../../../assets/images/banner/Comp.png') no-repeat center center /cover`,
      }}
    >
      <div className="product_div">
        <img
          className="img-fluid"
          src={bagr}
          style={{ opacity: '90%' }}
          alt=""
        />
        <div style={{ position: 'absolute' }}>
          <div
            className="section-overlay"
            style={{
              background: `url('../../../assets/images/banner/Comp.png') no-repeat center center / cover`,
            }}
          ></div>
        </div>
      </div>
    </section>
  )
}

export default ProductSneakPeek
