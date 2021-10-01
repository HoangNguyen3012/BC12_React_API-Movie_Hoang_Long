import React from 'react'

export default function Footer() {
    return (
        <div className="row pt-2" style={{backgroundColor:"#ecfffd"}}>
            <div className="col-4">
                <img src="../../../logo_Movie_Project.png" alt="Logo Big" />
            </div>
            <div className="col-4">
                <h6>Partner</h6>
                <div className="row row-cols-3">
                    <div className="py-3">
                        <img src="http://movie0706.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png" alt="" width="50px"/>
                    </div>
                    <div className="py-3">
                        <img src="http://movie0706.cybersoft.edu.vn/hinhanh/cgv.png" alt="" width="50px"/>
                    </div>
                    <div className="py-3">
                        <img src="http://movie0706.cybersoft.edu.vn/hinhanh/cinestar.png" alt="" width="50px"/>
                    </div>
                    <div className="py-3">
                        <img src="http://movie0706.cybersoft.edu.vn/hinhanh/galaxy-cinema.png" alt="" width="50px"/>
                    </div>
                    <div className="py-3">
                        <img src="http://movie0706.cybersoft.edu.vn/hinhanh/lotte-cinema.png" alt="" width="50px"/>
                    </div>
                </div>
            </div>
            <div className="col-4">
                <h6>Tell us your thoughts</h6>
                <div className="w-75 m-auto py-3">
                    <textarea className="form-control" name="" id="" cols="25" rows="3" placeholder="Leave us a comment"></textarea>
                </div>
                <button className="btn btn-sm btn-outline-info">Submit</button>
            </div>
        </div>
    )
}
