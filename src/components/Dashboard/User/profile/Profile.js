// import "bootstrap/dist/css/bootstrap.css";
import { useContext, useEffect, useState, useRef } from "react";
import "./Profile.css";
import { AuthContext } from "../../../../context/AuthContext";
import Layout from "../../../layout/Layout";
import { AlertContex } from "../../../../context/AlertContex";

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);

  const [data, setUserData] = useState({});
  console.log(user.user);
  const updateProfile = async (e) => {
    e.preventDefault();
    const form = e.target;
    const NewInfo = new FormData(form);
    const formToData = {};
    for (var key of NewInfo.keys()) {
      formToData[key] = NewInfo.get(key);
    }
    console.log(`formToData`, formToData);

    const response = await fetch("https://fmss-421313.uc.r.appspot.com/api/v1/users/me", {
      method: "put",
      body: JSON.stringify(formToData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": " application/json",
      },
    });
    console.log(NewInfo);
    const json = await response.json();
    console.log(json);
    if (json.success) {
      toggleOn(json.messages, json.success);
    }
  };

  const getUser = async () => {
    const res = await fetch("https://fmss-421313.uc.r.appspot.com/api/v1/users/", {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    setUserData(json.data.user);

    console.log(json.data.user);
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div className="all">
          <div>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                border: "1px solid #f3f4f5",
                justifyContent: "space-between",

                padding: "10px 15px",
              }}
            >
              <h2>Profile</h2>
            </div>
            <div
              style={{
                border: "1px solid #f3f4f5",
                display: "flex",
                flexDirection: "column",
              }}
              className="p-3 mb-4"
            >
              <div className="info">My Information</div>

              <div className="form1">
                <form onSubmit={updateProfile}>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "20px",
                      borderBottom: "1px solid #f2f3f4",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                      className="form-feild mb-3"
                    >
                      <label htmlFor="name">
                        Name <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        required="required"
                        id="name"
                        type="text"
                        className="inputstyle"
                        name="name"
                        value={data.name}
                        onChange={(e) => {
                          setUserData({
                            ...data,
                            name: e.target.value,
                          });
                        }}
                      ></input>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                      className="form-feild mb-3"
                    >
                      <label htmlFor="email">
                        Email Adress <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        required="required"
                        id="email"
                        type="text"
                        name="email"
                        className="inputstyle"
                        value={data.email}
                        onChange={(e) => {
                          setUserData({
                            ...data,
                            email: e.target.value,
                          });
                        }}
                      ></input>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                      className="form-feild mb-3"
                    >
                      <label htmlFor="password">
                        Password <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        required="required"
                        id="currentPassword"
                        type="password"
                        name="currentPassword"
                        className="inputstyle"
                        value={data.password}
                        onChange={(e) => {
                          setUserData({
                            ...data,
                            password: e.target.value,
                          });
                        }}
                      ></input>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                      className="form-feild mb-3"
                    >
                      <label htmlFor="newpassword"> New Password</label>
                      <input
                        id="newpassword"
                        type="password"
                        name="new_password"
                        className="inputstyle"
                        onChange={(e) => {
                          setUserData({
                            ...data,
                            newpassword: e.target.value,
                          });
                        }}
                      ></input>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                      className="form-feild mb-3"
                    >
                      <label htmlFor="newpasswordconf">
                        {" "}
                        New Password Confirmation
                      </label>
                      <input
                        id="newpasswordconf"
                        type="password"
                        className="inputstyle"
                        name="new_password_confirmation"
                        onChange={(e) => {
                          setUserData({
                            ...data,
                            newpasswordconf: e.target.value,
                          });
                        }}
                      ></input>
                    </div>
                    <input type="hidden" name="_method" value="put" />
                    <button
                      style={{
                        display: "flex",
                        flexDirection: "flex-start",
                        width: "25%",
                      }}
                      className="btn mb-3 btn-primary"
                      type="submit"
                      value="Update Information"
                    >
                      Update profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Profile;
