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
  formdata.append("page_number", data.no);

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
  myHeaders.append("Cookie", "PHPSESSID=b48e9472185e9e56bf83c7830d4d56fa");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("site_id", "258");
  formdata.append("first_name", data.first_name);
  formdata.append("last_name", data.last_name);
  formdata.append("lead_email", data.lead_email);
  formdata.append("comments", data.comments);
  formdata.append("phone", data.phone);
  formdata.append("is_grl_crea_lead", data.is_grl_crea_lead);
  formdata.append("user_id", "555");
  formdata.append("lead_type_id", "");
  formdata.append("lead_day_time", "");
  formdata.append("address", data.address);
  formdata.append("city", data.city);
  formdata.append("state", data.state);
  formdata.append("company_name", data.company_name);
  formdata.append("month", data.follow_value);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  console.log(data);
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

export const save_lead_activity_comments = (data) => {
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
  formdata.append("comment", data.comment);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/save_lead_activity_comments`, requestOptions);
};

export const update_lead_activity_comments = (data) => {
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
  formdata.append("comment", data.comment);
  formdata.append("activity_comment_id", data.comment_id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/save_lead_activity_comments`, requestOptions);
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

export const Search_page = (data) => {
  // console.log(data)
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=1bb554c648be2c018111aee2f9ad3803");

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

  return fetch(`${BASE_URI}/getsearchfilters`, requestOptions);
};

export const Pin_note = (data) => {
  // console.log(data)
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");

  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("lead_id", data.id);
  formdata.append("page_type", "");
  formdata.append("pined_note_text", data.pin_text);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/save_pinned_note`, requestOptions);
};

export const tasks = (data) => {
  // console.log(data)
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");

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

  return fetch(`${BASE_URI}/lead_tasks`, requestOptions);
};

export const add_lead_task = (data) => {
  console.log(data);
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");

  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("lead_id", data.id);
  formdata.append("reminder_time", data.rt);
  formdata.append("notes", data.notes);
  formdata.append("subject", data.subject);
  formdata.append("due_date", data.due_date);
  formdata.append("priority", data.priority);
  formdata.append("complete_percenatge", data.cp);
  formdata.append("enable_reminder", data.er);
  formdata.append("start_date", data.start_date);
  formdata.append("status", data.status);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  console.log(data);
  return fetch(`${BASE_URI}/add_lead_task`, requestOptions);
};

export const edit_lead_task = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");

  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("task_id", data.id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/edit_lead_task_data_set`, requestOptions);
};

export const update_lead_task = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");

  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("task_id", data.id);
  formdata.append("reminder_time", data.rt);
  formdata.append("notes", data.notes);
  formdata.append("subject", data.subject);

  formdata.append("priority", data.priority);
  formdata.append("complete_percenatge", data.cp);
  formdata.append("enable_reminder", data.er);
  formdata.append("start_date", data.start_date);
  formdata.append("status", data.status);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/update_lead_task`, requestOptions);
};
export const Appointment = (data) => {
  // console.log(data)
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");

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

  return fetch(`${BASE_URI}/fetch_appointments`, requestOptions);
};

export const add_lead_appointment = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("lead_id", data.id);
  formdata.append("reminder_time_unit", data.reminder_time_unit);
  formdata.append("notes", data.notes);
  formdata.append("subject", data.subject);
  formdata.append("reminder", data.reminder);
  formdata.append("reminder_time", data.reminder_time);

  formdata.append("end_time", data.end_date);
  formdata.append("all_day_event", data.day_event);
  formdata.append("start_time", data.start_date);
  formdata.append("site_id", "258");
  formdata.append("location", data.location);
  formdata.append("show_time_as", data.time_as);
  formdata.append("appointment_id", "");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/save_appointment`, requestOptions);
};

export const Update_lead_appointment = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("lead_id", data.lead_id);
  formdata.append("reminder_time_unit", data.reminder_time_unit);
  formdata.append("notes", data.notes);
  formdata.append("subject", data.subject);
  formdata.append("reminder", data.reminder);
  formdata.append("reminder_time", data.reminder_time);

  formdata.append("end_time", data.end_date);
  formdata.append("all_day_event", data.day_event);
  formdata.append("start_time", data.start_date);
  formdata.append("site_id", "258");
  formdata.append("location", data.location);
  formdata.append("show_time_as", data.time_as);
  formdata.append("appointment_id", data.appointment_id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/save_appointment`, requestOptions);
};

export const Appointment_detail = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("appointment_id", data.id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/fetch_appointment_detail`, requestOptions);
};

export const Edit_Appointment_detail = (data) => {
  // console.log(data);
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("appointment_id", data.id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/manage_appointment`, requestOptions);
};

export const Create_Appointment_detail = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  // formdata.append("lead_id", data.id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/manage_appointment`, requestOptions);
};

export const Task_detail = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("task_id", data.id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/view_task_detail`, requestOptions);
};

export const Create_lead_task = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
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

  return fetch(`${BASE_URI}/create_lead_task`, requestOptions);
};

export const Note = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
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

  return fetch(`${BASE_URI}/lead_notes`, requestOptions);
};

export const Add_Note = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("lead_id", data.id);
  formdata.append("note", data.note);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/save_lead_notes`, requestOptions);
};

export const Update_lead_Note = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("lead_id", data.id);
  formdata.append("note", data.note);
  formdata.append("note_id", data.note_id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/save_lead_notes`, requestOptions);
};

export const Mark_task = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("lead_id", data.id);
  formdata.append("task_status", data.task_status);
  formdata.append("task_id", data.task_id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  console.log(data);

  return fetch(`${BASE_URI}/mark_task_as_completed`, requestOptions);
};

export const remove_tag = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("lead_id", data.lead_id);
  formdata.append("tag_id", data.tag_id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  console.log(data);

  return fetch(`${BASE_URI}/remove_tag_from_lead`, requestOptions);
};

export const add_tag = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("lead_id", data.lead_id);
  formdata.append("tag_id", data.tag_id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  console.log(data);

  return fetch(`${BASE_URI}/assign_tag_to_lead`, requestOptions);
};

export const Appointment_full = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
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
  console.log(data);

  return fetch(`${BASE_URI}/fetch_appointments`, requestOptions);
};

export const Task_full = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("page_number", data.no);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/crm_task_list_full`, requestOptions);
};

export const Task_full_completed = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("page_number", data.no);
  formdata.append("completed", "1");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/crm_task_list_full`, requestOptions);
};

export const Tags = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("page_number", data.no);
  formdata.append("search", "");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/user_tags`, requestOptions);
};

export const Save_tag = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("tag_id", data.id);
  formdata.append("tag_description", data.des);
  formdata.append("tag_name", data.name);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/save_tag`, requestOptions);
};

export const Delete_Tag = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("tag_id", data.id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/delete_tag`, requestOptions);
};

export const system_Tag = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
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

  return fetch(`${BASE_URI}/system_tags`, requestOptions);
};

export const Recent_chat = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("page_number", data.no);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/recent_sms_conversations`, requestOptions);
};

export const Sms_chat = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
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

  return fetch(`${BASE_URI}/lead_sms_chat`, requestOptions);
};

export const Send_sms = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("lead_id", data.id);
  formdata.append("text", data.msg);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/lead_sms_send`, requestOptions);
};

export const Delete_sms = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("lead_id", data.id);
  formdata.append("message_id", data.msg_id);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  console.log(data);
  return fetch(`${BASE_URI}/lead_sms_delete`, requestOptions);
};

export const Voicemail_audio = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);
  formdata.append("default_voicemail_method", "ivoicecast");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  console.log(data);
  return fetch(`${BASE_URI}/fetch_audios`, requestOptions);
};

export const Saved_Searches = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);

  formdata.append("lead_id", data.id);
  formdata.append("page_number", data.no);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/view_saved_searches`, requestOptions);
};

export const Stop_saved_search_email = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);

  formdata.append("lead_id", data.id);
  formdata.append("lead_user_id", data.user_id);
  formdata.append("pause_searches_by_admin", data.no);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  console.log(data);

  return fetch(`${BASE_URI}/stop_saved_search_email`, requestOptions);
};

export const View_visits = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);

  formdata.append("lead_id", data.id);
  formdata.append("page_number", data.no);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/view_visits`, requestOptions);
};

export const View_statics = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);

  formdata.append("lead_id", data.id);
  formdata.append("page_number", data.no);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/view_statics`, requestOptions);
};

export const View_Fav = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);

  formdata.append("lead_id", data.id);
  formdata.append("page_number", data.no);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/view_favourite_properties`, requestOptions);
};

export const Upload_Audio = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);

  formdata.append("audio_title", data.a_t);
  formdata.append("MIME TYPE", fileInput.files[0], "/path/to/file");
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  console.log(data);
  return fetch(`${BASE_URI}/upload_audio_file`, requestOptions);
};

export const Send_voicemail = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);

  formdata.append("audio_id", data.audio_id);
  formdata.append("audio_url", data.url);
  formdata.append("lead_id", data.id);
  formdata.append("text", data.text);
  formdata.append("default_voicemail_method", "ivoicecast");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  console.log(data);
  return fetch(`${BASE_URI}/send_voicemail`, requestOptions);
};


export const Search_filter = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);

  formdata.append("page_number", data.no);
  formdata.append("action", "all");
  formdata.append("date", data.date);
  formdata.append("date_to", data.date_to);
  formdata.append("date_from", data.date_from);
  formdata.append("email_verified", data.e_v);
  formdata.append("is_grl_crea_lead", data.i_g_c_l);
  formdata.append("keyword", data.text);
  formdata.append("lead_day_time", data.l_d_t);
  formdata.append("lead_type_id", data.l_t_i);
  formdata.append("site_id", data.s_i);
  formdata.append("tag_ids", data.t_i);
  formdata.append("user_id", data.u_i);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  console.log(data);
  return fetch(`${BASE_URI}/getleads`, requestOptions);
};


export const Priority_hit = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);

  formdata.append("action", "priority");
formdata.append("priority_id", data.id);
  formdata.append("page_number", data.no);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/getleads`, requestOptions);
};

export const Active_filters = (data) => {
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=5abfd9f47bfd3d6af8aab5d8036c0725");
  var formdata = new FormData();
  formdata.append("hash", hash);
  formdata.append("key", key);
  formdata.append("email", data.email);
  formdata.append("password", data.password);

 
formdata.append("active_users_filter", data.filters);
  formdata.append("page_number", data.no);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch(`${BASE_URI}/most_active_users`, requestOptions);
};