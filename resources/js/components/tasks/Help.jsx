import React from 'react';


function Help() {
  return (
    <>
    
    <div>
      <h2 className='text-center tx-tfm mt-4'>Send e-mail to customer service</h2>
      <form action="mailto:elkatielyemlahi@gmail.com" method="post" encType="text/plain">
        <input
          type="submit"
          value="Send"
          className="btn btn-block btn-outline-dark me-2 mybtn tx-tfm"
          style={{ marginTop: '50px' }}
        />
      </form>
    </div>
    
    </>
  );
}

export default Help;
