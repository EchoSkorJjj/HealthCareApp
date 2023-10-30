import '../../../assets/styles/private_styles/Settings.css';


export default function Settings() {
    

    return (
        <div className='container-fluid px-0 settings-container bg-light'>
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center text-dark mb-5">Settings</h2>
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <div className="card border-secondary">
                                    <div className="card-header">
                                        <h3 className="mb-0 my-2">Dark Mode</h3>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">Change the application to dark mode.</p>
                                        <button type="button" className="btn btn-dark">Dark Mode</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mx-auto">
                                <div className="card border-secondary">
                                    <div className="card-header">
                                        <h3 className="mb-0 my-2">Light Mode</h3>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">Change the application to light mode.</p>
                                        <button type="button" className="btn btn-light">Light Mode</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mx-auto">
                                <div className="card border-secondary">
                                    <div className="card-header">
                                        <h3 className="mb-0 my-2">Change Password</h3>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">Change your password.</p>
                                        <button type="button" className="btn btn-primary">Change Password</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mx-auto">
                                <div className="card border-secondary">
                                    <div className="card-header">
                                        <h3 className="mb-0 my-2">Delete Account</h3>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">Delete your account.</p>
                                        <button type="button" className="btn btn-danger">Delete Account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}