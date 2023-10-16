import React from 'react';
import '../../../assets/styles/private_styles/Profile.css';
import useProfileStore  from '../../../features/store/ProfileStore';
import {useState} from 'react';

export default function Profile() {
    const profileData = useProfileStore((state) => state.profileStore);
    const setProfileData = useProfileStore((state) => state.setProfileData);

    const [settingForm, updateFormState] = useState({
        username: profileData.username,
        fullname: profileData.fullname,
        age: profileData.age,
        gender: profileData.gender,
        bio: profileData.bio,
        email: profileData.email,
        profilePicture: profileData.profilePicture,
    });

    function saveProfileData(userProfileData) {
        setProfileData({
          username: userProfileData.username, 
          fullname: userProfileData.fullName, 
          age: userProfileData.age, 
          gender: userProfileData.gender, 
          email: userProfileData.email,
          bio: userProfileData.bio,
          profilePicture: userProfileData.profilePicture
        })
      }

    function updateForm(value) {
        return updateFormState((prev) => {
            return {...prev, ...value};
        });
    }

    function handleFileChange(e) {
        const selectedFile = e.target.files[0];
        
        if (selectedFile) {
            const allowedMimeTypes = ['image/jpeg', 'image/png'];
            
            if (allowedMimeTypes.includes(selectedFile.type)) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64Data = event.target.result;
                    updateForm({ profilePicture: base64Data });
                };
    
                reader.readAsDataURL(selectedFile);
            } else {
                window.alert('Selected file format is not supported. Please choose a JPEG or PNG image.');
            }
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (settingForm.username == '' || settingForm.fullname == '') {
            e.stopPropagation();
            window.alert("You must provide username and fullname");
            return;
        }

        const newSetting = {...settingForm};

        try {
            const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_HTTPS_SERVER : import.meta.env.VITE_DEVELOPMENT_SERVER;
            const response = await fetch(`${baseUrl}/api/account/updateSetting`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(newSetting),
            });

            if (response.ok) {
                const dataResponse = await response.json();
                const userProfileData = dataResponse.profile;
                saveProfileData(userProfileData);
                updateFormState({
                    username: userProfileData.username, 
                    fullname: userProfileData.fullName,
                    age: userProfileData.age,
                    gender: userProfileData.gender,
                    email: userProfileData.email,
                    bio: userProfileData.bio,
                    profilePicture: userProfileData.profilePicture});
                window.alert("Profile Updated Successfully");
            } else {
              try {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.message; // Assuming the error message is stored in a "message" field
                window.alert(`Profile Update Failed: ${errorMessage}`);
              } catch (error) {
                window.alert("An error occurred while updating settings."); // Fallback if unable to parse error response
              }
            }
        }  catch(error) {
            window.alert(error);
        }
    }

    return (
        <div className='container profile-container bg-light col-lg-9 overflow-y-auto'>
            <div className="container py-5">
            <div className="row">
                    <div className='col-lg-3'>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src={profileData.profilePicture} alt="Admin" className="rounded-circle p-1 bg-primary" width="110"/>
                                    <div className="mt-3">
                                        <h2>{profileData.username}</h2>
                                        <p className="text-secondary mb-1">{profileData.fullname}</p>
                                        <p className="text-muted font-size-sm">Bio: {profileData.bio}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-9'>
                        <div className="card">
                            <div className="card-header profile-header">
                                <h5>Edit Profile</h5>
                            </div>
                            <div className="card-body">
                                <form className="row mb-3 gy-3" onSubmit={handleSubmit}>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="username" className='form-label float-start'>Username</label>
                                            <input type="text" className="form-control" id="username" placeholder="Your username" value={settingForm.username} onChange={(e) => updateForm({username: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="fullname" className='form-label float-start'>Full Name</label>
                                            <input type="text" className="form-control" id="fullname" placeholder="Your fullname" value={settingForm.fullname} onChange={(e) => updateForm({fullname: e.target.value})}/>
                                        </div>
                                    </div>                                                                
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="age" className='form-label float-start'>Age</label>
                                            <input type="number" className="form-control" id="age" placeholder="Your age" value={settingForm.age} onChange={(e) => updateForm({age: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="gender" className='form-label float-start'>Gender</label>
                                            <select className="form-select" id="gender" value={settingForm.gender} onChange={(e) => updateForm({gender: e.target.value})}>
                                                <option disabled value=''>Choose...</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="others">Others</option>
                                                <option disabled>Dont cancel me please</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="email" className='form-label float-start'>Email</label>
                                            <input className="form-control" disabled id="email" type="text" placeholder="name@example.com" value={settingForm.email} onChange={(e) => updateForm({email: e.target.value})}/>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="bio" className='form-label float-start'>Biography</label>
                                            <textarea className="form-control" id="bio" type="text" style={{height: 100}} value={settingForm.bio} onChange={(e) => updateForm({bio: e.target.value})}></textarea>
                                        </div>
                                    </div>                                                              
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="profilepic" className='form-label float-start'>Profile Picture</label>
                                            <input
                                                className="form-control"
                                                id="profilepic"
                                                type="file"
                                                accept="image/jpeg, image/png"
                                                onChange={(e) => handleFileChange(e)}
                                            />
                                        </div>
                                    </div>                                                              
                                    <div className="col-12">
                                        <button className="btn btn-primary float-start" type="submit">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}