

const Wallet = () => {
      return ( 
            <div class="hero min-h-screen bg-base-200">
                  <div class="hero-content text-center">
                        <div class="max-w-md">


                              {/* 質押*/}
                              <div class="stats bg-primary text-primary-content">
                                    <div class="stat">
                                          <div class="stat-title">Account balance</div>
                                          <div class="stat-value">$89,400</div>
                                          <div class="stat-actions">
                                                <button class="btn btn-sm btn-success">Claim</button>
                                          </div>
                                    </div>
                                    
                                    <div class="stat">
                                          <div class="stat-title">Current balance</div>
                                          <div class="stat-value">$89,400</div>
                                          <div class="stat-actions">
                                                <button class="btn btn-sm">Claim</button>
                                          </div>
                                    </div>
                              
                              </div>
                        </div>
                  </div>
            </div>
       );
}
 
export default Wallet;