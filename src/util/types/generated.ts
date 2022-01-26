export interface ICourse {
    id?:                                   number;
    root_account_id?:                      number;
    account_id?:                           number;
    name?:                                 string;
    enrollment_term_id?:                   number;
    uuid?:                                 string;
    start_at?:                             Date;
    grading_standard_id?:                  null;
    is_public?:                            boolean;
    created_at?:                           Date;
    course_code?:                          string;
    default_view?:                         string;
    license?:                              string;
    grade_passback_setting?:               null;
    end_at?:                               Date;
    public_syllabus?:                      boolean;
    public_syllabus_to_auth?:              boolean;
    storage_quota_mb?:                     number;
    is_public_to_auth_users?:              boolean;
    homeroom_course?:                      boolean;
    course_color?:                         null;
    friendly_name?:                        null;
    apply_assignment_group_weights?:       boolean;
    calendar?:                             ICalendar;
    time_zone?:                            string;
    blueprint?:                            boolean;
    template?:                             boolean;
    enrollments?:                          IEnrollment[];
    hide_final_grades?:                    boolean;
    workflow_state?:                       string;
    restrict_enrollments_to_course_dates?: boolean;
    overridden_course_visibility?:         string;
}

export interface ICalendar {
    ics?: string;
}

export interface IEnrollment {
    type?:                               string;
    role?:                               string;
    role_id?:                            number;
    user_id?:                            number;
    enrollment_state?:                   string;
    limit_privileges_to_course_section?: boolean;
}

export interface IUser {
    id?:               number;
    name?:             string;
    short_name?:       string;
    sortable_name?:    string;
    avatar_url?:       string;
    title?:            null;
    bio?:              null;
    primary_email?:    string;
    login_id?:         string;
    integration_id?:   null;
    time_zone?:        string;
    locale?:           null;
    effective_locale?: string;
    calendar?:         ICalendar;
    lti_user_id?:      string;
    k5_user?:          boolean;
}

export interface ICalendar {
    ics?: string;
}

export interface IEnrollments {
    user_id?:                            number;
    id?:                                 number;
    course_id?:                          number;
    course_section_id?:                  number;
    root_account_id?:                    number;
    type?:                               string;
    created_at?:                         Date;
    updated_at?:                         Date;
    associated_user_id?:                 null;
    start_at?:                           null;
    end_at?:                             null;
    limit_privileges_to_course_section?: boolean;
    enrollment_state?:                   string;
    role?:                               string;
    role_id?:                            number;
    last_activity_at?:                   Date;
    last_attended_at?:                   null;
    total_activity_time?:                number;
    grades?:                             IGrades;
    html_url?:                           string;
    user?:                               IEUser;
}

export interface IGrades {
    html_url?:      string;
    current_grade?: null;
    current_score?: null;
    final_grade?:   null;
    final_score?:   null;
}

export interface IEUser {
    id?:            number;
    name?:          string;
    created_at?:    Date;
    sortable_name?: string;
    short_name?:    string;
    login_id?:      string;
}

export interface IEvent {
    id?:                 number;
    start_at?:           Date;
    title?:              string;
    end_at?:             Date;
    workflow_state?:     string;
    created_at?:         Date;
    updated_at?:         Date;
    all_day?:            boolean;
    all_day_date?:       null;
    comments?:           null;
    location_address?:   null;
    location_name?:      string;
    type?:               string;
    description?:        string;
    child_events_count?: number;
    all_context_codes?:  string;
    context_code?:       string;
    context_name?:       string;
    context_color?:      null;
    parent_event_id?:    null;
    hidden?:             boolean;
    child_events?:       any[];
    url?:                string;
    html_url?:           string;
    duplicates?:         any[];
    important_dates?:    boolean;
}

export interface ICGrades {
    name: string;
    grade: number;
    id: number;
}
