export const groupID = [];
for (let ID = 1; ID < 15; ID++) {
    if(ID < 10) {groupID.push('GP0' + ID);}
    else {groupID.push('GP' + ID);};
} // create groupID for select

export const userType = [ 'QuanTri', 'KhachHang' ];