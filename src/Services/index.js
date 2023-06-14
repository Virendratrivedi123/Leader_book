const BASE_URI = "http://www.advancewebsites.com/crm_api";
const hash = "c0e4ac08899b02ca1a92b4e2f26fb0b6";
const key = "7632d69f1f8ddac65151c56dea11d76a";

export const LOGIN = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=6ff92dd70ed17687f0ee2c3a77d5a865");

  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/authentication`, requestOptions);
};

export const Forgot_password = (email) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=6ff92dd70ed17687f0ee2c3a77d5a865");

  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", email);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/forgotpassword`, requestOptions);
};

export const edit_profile = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=6ff92dd70ed17687f0ee2c3a77d5a865");

  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/edit_profile_data_set`, requestOptions);
};

export const user_update = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=441a746e08939731ebfa767ef7a4765f");

  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  // formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("first_name", data.first_name);
  formdata.append("last_name", data.last_name);
  formdata.append("email", data.email);
  formdata.append("phone", data.phone);
  formdata.append("address", data.address);
  formdata.append("city", data.city);
  formdata.append("state", data.state);
  formdata.append("title", data.title);
  formdata.append("company", data.company);
  formdata.append("text_sign", data.text_sign);
  formdata.append("country_id", data.country_id);
  console.log(data);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/update_profile`, requestOptions);
};

export const get_leads = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=6ff92dd70ed17687f0ee2c3a77d5a865");

  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("action", "recent");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/getleads`, requestOptions);
};

export const get_leads_priorities = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=6ff92dd70ed17687f0ee2c3a77d5a865");

  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/getleadpriorities`, requestOptions);
};
export const get_leads_All = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=6ff92dd70ed17687f0ee2c3a77d5a865");

  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("action", "all");
  formdata.append("page_number", "");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/getleads`, requestOptions);
};
export const get_leads_basic_detail = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=6ff92dd70ed17687f0ee2c3a77d5a865");

  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("lead_id", data.id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/getleaddetail`, requestOptions);
};
export const Edit_leads_basic_detail = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=6ff92dd70ed17687f0ee2c3a77d5a865");

  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("lead_id", data.id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/edit_lead_detail`, requestOptions);
};

export const Edit_leads_basic_detail_update = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=441a746e08939731ebfa767ef7a4765f");

  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("lead_id", data.id);
  formdata.append("first_name", data.first_name);
  formdata.append("last_name", data.last_name);
  formdata.append("lead_email", data.lead_email);
  formdata.append("comments", data.comments);
  formdata.append("phone", data.phone);
  formdata.append("is_grl_crea_lead", data.assigned);
  formdata.append("user_id", data.lead_type);
  formdata.append("lead_type_id", "");
  formdata.append("lead_day_time", "");
  formdata.append("address", data.address);
  formdata.append("city", data.city);
  formdata.append("state", data.state);
  formdata.append("company_name", data.company_name);
  formdata.append("month", data.month);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/save_lead`, requestOptions);
};

export const New_lead_detail = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=b94324c1e51aa138ac629bc44ac94df6");

  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/new_lead_detail`, requestOptions);
};

export const New_lead_detail_update = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=570b4e976a4ad49cfce7c6f83180cfe3");

  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("site_id", "555");
  formdata.append("first_name", data.first_name);
  formdata.append("last_name", data.last_name);
  formdata.append("lead_email", data.lead_email);
  formdata.append("comments", data.comments);
  formdata.append("phone", data.phone);
  formdata.append("is_grl_crea_lead", data.assigned);
  formdata.append("user_id", "555");
  formdata.append("lead_type_id", "");
  formdata.append("lead_day_time", "");
  formdata.append("address", data.address);
  formdata.append("city", data.city);
  formdata.append("state", data.state);
  formdata.append("company_name", data.company_name);
  formdata.append("month", "");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/save_new_lead`, requestOptions);
};

export const View_lead_activity = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=b94324c1e51aa138ac629bc44ac94df6");

  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("activity_type", "");
  formdata.append("page_number", "");
  formdata.append("lead_id", data.id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/view_lead_activities`, requestOptions);
};

export const View_lead_activity_comments = (data) => {
  // console.log(data)
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=077a966f8c104c007e970f5eb75bb4e7");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("activity_type", data.activity_type);
  formdata.append("lead_activity_id", data.lead_activity_id);
  formdata.append("lead_id", data.lead_id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/view_lead_activity_comments`, requestOptions);
};

export const Related_page_counter = (data) => {
  // console.log(data)
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=680b6f54b6d4eeb4700adafdc392bf06");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);

  formdata.append("lead_id", data.lead_id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/related_page_counters`, requestOptions);
};
