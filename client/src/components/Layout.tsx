interface Props {
    children: React.ReactNode
}

function Landing({children}: Props) {
    return (
      <div className='layout'>
        <div className='layout-content'>
            {children}
        </div>
      </div>
    )
  }
  
export default Landing
  