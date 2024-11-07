import React from 'react'

const Rightsidebar = ({chatMessageData}) => {
  return (
    <>
        <div class="offcanvas offcanvas-end" style={{backgroundColor : "#fff" , borderRadius :'10px' , height :'851px' , marginTop:'72px' ,width: '310px'}}  data-bs-backdrop="false" tabindex="-1" id="offcanvasStart" aria-labelledby="staticBackdropLabel">
            <div class="">
            <div class="btn-close float-end mt-1 mx-2" data-bs-dismiss="offcanvas" aria-label="Close"></div>
                <div className='profile-top  p-2' >
                <div class="p-2"  >
                    <img className='rounded' src={chatMessageData.bio_pic ? chatMessageData.bio_pic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTu9pPTi6sJYwiM_MHafuDFQczkTQJABENfg&s"} style={{ borderRadius : '40px'}} height='150' class="card-img-top" alt="..."/>
                    <div class="text-center position-absolute  fs-10 translate-middle rounded  fs-5" style={{ top: "158px" , right: "56px"}}>
                        <img src={chatMessageData.pro_pic ? chatMessageData.pro_pic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s"} height="100" width="100" class="rounded-circle" alt="..."/>
                    </div>
                    <div className='text-center mt-5 text-black'> {chatMessageData.user_profile} </div>
                    <div className='text-center mt-1 text-black mb-2'> {chatMessageData.email}</div>
                </div>
                </div>
                <div className='profile=-middle p-2'>
                    <div className='row mt-2'>
                        <div className='col-lg-12'>
                            <div className='' style={{ borderRadius : '40px'}}>
                                <div className='bg-white text-black  mt-1 p-3'>Phone    : {chatMessageData.mobail}</div>
                                <div className='bg-white text-black  mt-1 p-3'>school   : {chatMessageData.school}</div>
                                <div className='bg-white text-black  mt-1 p-3'>collage  : {chatMessageData.collage}</div>
                                <div className='bg-white text-black  mt-1 p-3'>City     : {chatMessageData.city}</div>
                                <div className='bg-white text-black  mt-1 p-3'>joining  : {chatMessageData.create_at}</div>
                                <div className='bg-white text-black  mt-1 p-3'>gender  : {chatMessageData.gender}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Rightsidebar
