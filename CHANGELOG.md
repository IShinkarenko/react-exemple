# Changelog

## v2.4.5 (2022-04-26)

### Added (5 changes)

- Fixed Relationship Settings that were not immediately available on Add Relationship dialogue.
- Added ability to save physical address information on a Relationship profile.
- Hiding Analytics for Basic subscription users. Temporary.
- Hiding Channels for Basic subscription users. Temporary.
- Added `required` parameter to Contact Expansion PDL API call to limit responses to desired results.

## v2.4.4 (2022-04-14)

### Added (2 changes)

- Expand Company with PDL Person Search Enrichment Call.
- Added AltIndex AppSync Backend Pipeline Function.

## v2.4.3 (2022-03-29)

### Added (9 changes)

- Fix for search dialogue height.
- Fix for editing custom field without prior value on relationship profile.
- More context for confirmation code on first-time sign-up.
- More context for adding keywords on company profile.
- Fix for missing Title on Custom profile section.
- Fix for drag-and-drop on company profile section and item repositioning.
- More context for mapping csv columns to destination fields on import.
- Change of relationship profile for less US-centric english translation of addresses.
- Change to behavior of search, objective filter.

## v2.4.2(2022-03-29)

### Added (10 changes)

- Updated Add Relationship dialogue to be more user friendly.
- Added Standard Tags to Add Relationship dialogue.
- Added util for appending protocol to URLs.
- Fixed Social Links on Relationship Profile.
- Fixed Claim Notice on Change of Company Profile website for same company.
- After sign-up, redirect is set to Company Profile instead of new channel.
- Fix for Channel Settings where options edit/cancel options too far from dropdowns.
- Hiding translations for now and defaulting to English.
- Added default definitions at company creation on backend when new user confirmed.
- Updated required fields on sign-up.

## v2.4.1(2022-03-23)

### Added (2 changes)

- Providing option to connect to a company as first iteration. Requires second iteration.
- Removed example keywords from lists available to Company Profile.

## v2.4.0(2022-03-20)

### Added (6 changes)

- Fixed max length of description on sign-up.
- Fixed website value not submitting on sign-up.
- Fixed failure to save profile section item on a section.
- Fixed duplicate objective in locale lists for "Join a Business Support Community.
- Added markdown version of Terms and Conditions for sign-up.
- Fixed international phone number requirement format for sign-up per Cognito spec.

## v2.3.9(2022-033-08)

### Added (1 change)

- Add Slide Filter to Search Results for Number of Objectives to Match On [EF-488]

## v2.3.8(2022-02-23)

### Added (1 change)

- Bind to Mutation for batchDeleteCompanyRelationshipsByFilter(filter) for Deletion Across Pages [EF-487]

## v2.3.7(2022-02-18)

### Added (1 change)

- Part 2 of Follow a Company [EF-486]

### Fixed(1 change)

- Added a confirm for “Unfollow” [EF-471]
- Fixed relationships pagination issue

## v2.3.5(2022-02-08)

### Added (1 change)

- Refine "Follow/Unfollow" Company in Relationships [EF-471]

## v2.3.4(2022-02-06)

### Added (1 change)

- Allow Incoming Query to Invoke Search [EF-474]

### Fixed (3 changes)

- Fixed search loading modal window(changed full-screen view to normal)
- Temporarily hid Top Companies list on Search Results page

## v2.3.3(2022-02-02)

### Added (1 change)

- Add Sector Selection to Company Profile Editor [EF-479]

### Fixed (2 changes)

- Fixed UpdateCompany mutation
- Added translations for Company.visibility

## v2.3.2(2022-01-26)

### Added (1 change)

- Provide secure upload of CSV files and images. [EF-457]

## v2.3.1(2022-01-21)

### Added (1 change)

- Provide Option in Relationships to Delete Across Pages [EF-466]

## v2.3.0(2022-01-12)

### Added (1 change)

- Propose Paid Subscriber Search Results [EF-450]
- Propose Paid Profile Completion on Company Profile [EF-451]
- Update UI for ContactRelationship for New Fields [EF-454]

## v2.2.9(2021-12-16)

### Added (1 change)

- Rename All "...Filtered" Collections in Client-side GraphQL API Back to Original Names[EF-447]

## v2.2.8(2021-12-09)

### Added (1 change)

- Updated Company.usersFiltered; Filtering; Pagination [EF-442]

### Fixed (3 changes)

- Lowercase searchPhrase
- Reset page to 1 when filtering data
- Remove checkbox from Members table

## v2.2.7(2021-12-08)

### Added (1 change)

- Added DataGrid instead regular Table component
- Change Company.channelsFiltered queries
- Added filters for Company.relationshipsFiltered

### Fixed (2 change)

- Fixed relationships pagination, cleaned-up Relationships

## v2.2.6(2021-12-06)

### Fixed (2 change)

- Fixed duplicate searche results on Channel.connections
- Moved alert on Relationship Profile to tooltip

## v2.2.5(2021-12-06)

### Added (1 change)

- Frontend Implementation of Fast Filtering - Added Company.definitionsFiltered and CompanyChannel.connectionsFiltered [EF-442]

## v2.2.4(2021-11-27)

### Fixed (1 change)

- Add Company.description to Search Results []EF-437

## v2.2.3(2021-11-24)

### Added (1 change)

- User must be able to "Follow" another company - part 1 [EF-376]

### Fixed (3 change)

- Added new openGraph image
- Changed/fixed styles for some components(sidebar,header, searchField, ...)
- Cleaned unused graphQl fragment

## v2.2.2(2021-11-17)

### Added (1 change)

- Autocomplete on click of "Expand" for a Relationship from existing, backend data on domain match. Limit. [EF-384]

## v2.2.1(2021-11-11)

### Added (1 change)

- User must be able to "Share" a profile (Raw URL, Facebook, LinkedIn, Twitter) [EF-374]

### Fixed (3 change)

- Removed .babelrc file
- Updated translations
- Fixed header&footer UI related bugs

## v2.2.0(2021-11-8)

### Fixed (1 change)

- Browser Testing [EF-422]
- Updated translations, fixed a few UI issues

## v2.1.9(2021-11-3)

### Added (1 change)

- Language selection should only by "Language." Country can be obtained elsewhere for formats. [EF-378]

### Fixed (1 change)

- Added missed translations

## v2.1.8(2021-10-30)

### Added (1 change)

- Implement Initial "Text Summary" on Company Profile(MOKED DATA) [EF-416]

## v2.1.7(2021-10-28)

### Added (1 change)

- User must be able to "Claim" a profile that has not been claimed before (Search & Sign-up) [EF-408]

## v2.1.6(2021-10-18)

### Added (1 change)

- Unify Sign-up Interface [EF-420]

## v2.1.5(2021-10-14)

### Added (1 change)

- Create Free Text Search Alternative to Current Search Wizard [EF-414]

## v2.1.4(2021-10-11)

### Fixed (2 change)

- Added Custom Fields to Relationship Profile
- Update relationship list on add/delete relationship

## v2.1.3(2021-10-08)

### Added (1 change)

- Request 1,000 Search Results & Paginate [EF-417]

### Fixed (1 change)

- Made website field as a link on Public Company view

## v2.1.2(2021-10-06)

### Added (1 change)

- Clean-up and fixing bugs in Relationship Profile [EF-411]

### Fixed (3 change)

- Added duration to Progress Indicator

## v2.1.1(2021-09-30)

### Added (0 change)

### Fixed (3 change)

- Added duration to Progress Indicator
- Fixed subtitle form 'Founded Companies' to 'Companies Found'
- Added verification if user is unauthenticated for pages sign-in and search-results

## v2.1.0(2021-09-29)

### Added (3 change)

- Make Evident to User He/She Can Close Public Profile Being Reviewed [EF--398]
- Ensure User Has Provided Tags for Search Query On /search-results [EF-400]
- Update Unauthenticated Search Workflow for Mobile Viewports (Results, Tags, Complete Profile) [EF-402]

## v2.0.9(2021-09-28)

### Added (2 change)

- Implement Better Progress Indication to User on Search [EF-397]
- Send in a limit with the query to get Country/State/City [EF-394]

## v2.0.8(2021-09-27)

### Added (3 change)

- Company Size Does Not Seem to Display on Public/Static Profile [EF-395]
- Determine Default Value for Public/Private Company Status When Unknown [EF-396]
- Add Total Count of Matches to Search Results (25 of (n)) [EF-401]

## v2.0.7 (2021-09-23)

### Fixed (1 changes)

- Tags on Company and Channel are Not Allowing Edit When Empty [EF-399]

## v2.0.6 (2021-09-16)

### Added (6 change)

- Used searchCompaniesByTags to get search results.
- Constructed a value for freeSolo for industrialSector added values as follows: uuid#lowercaselabel.
- Disabled freeSolo for the objective autocomplete.
- Fixed Channel Settings.
- Cleaned-up Assistant Research, UnauthenticatedSearch.
- Fixed WorldAtlas to set `key` as value instead of `country` so that full geography names are included.
- Removed the United Kingdom from association with the European Union.

## v2.0.5 (2021-09-10)

### Added (1 change)

- Ensure pagination of results on Relationships. [EF-363]
- Update Company Profile Employee Count enumeration and dropdown to match our data. [EF-348]

## v2.0.4 (2021-09-06)

### Added (1 change)

- All interfaces must be mobile friendly. [EF-354]
- Removed mocked data from Channel’s first tab [EF-358]

### Fixed (1 changes)

- Disabled autocomplete/autofill for inputs

## v2.0.4 (2021-09-03)

### Added (1 change)

- Company Profile "Location" must be standardized City, Region, Country. Investigate solution. [EF-347]

## v1.5.2 (2021-08-31)

### Fixed (1 changes)

- removed cancelOnBlur prop from easy-edit-field

## v2.0.3 (2021-08-29)

### Added (1 change)

- Refactored for schema changes and API migration. [EF-356]

## v2.0.2 (2021-08-27)

### Added (2 changes)

- Hide dropdown filters on Relaltionships List for "Basic" subscription level. We will enable for beta release. [EF-361]
- Hide "Smart Tags" on Relationship Settings for "Basic" subscription level. We will enable for beta release. [EF-362]

## v2.0.1 (2021-08-24)

### Added (1 changes)

- Make channel settings look and operate inline like Company Profile. [EF-346]

## v2.0.0 (2021-08-23)

### Added (2 changes)

- Remove first filter (Company Profile / Channels) from Analytics [EF-351]
- User Preferences to make clear what preferences are available and why [EF-349]

### Fixed (2 changes)

- Fixed analytics charts
- Added refreshToken

## v1.9.9 (2021-08-17)

### Added (1 changes)

- First Pass At Channel Data Instrumentation from EF-338/340 [EF-341]

## v1.9.8 (2021-08-13)

### Added (2 changes)

- Apply Spinner & Other Auth Related Hacks [EF-339]
- Fix Company Profile View When In Assisted Research (Redirects to Unauthenticated Results) [EF-344]

## v1.9.7 (2021-08-11)

### Added (2 changes)

- Implementation of Stripe Integration for Payment Processing [EF-335]
- Implementation of Stripe Integration for Customer Portal [EF-337]

## v1.9.6 (2021-07-30)

### Added (1 changes)

- Rework Company Profile Sections and Their Items [EF-334]

## v1.9.5 (2021-07-26)

### Added (1 changes)

- Consolidate General Info and Settings (Tags) for Company Profile [EF-333]

## v1.9.4 (2021-07-21)

### Added (1 changes)

- Edit and Apply Company Profile Banner [EF-332]

### Fixed (1 changes)

- Added missed en-US translations

## v1.9.3 (2021-07-13)

### Added (1 changes)

- Define a Methodology For Identifying Required Translations [EF-329]

## v1.9.2 (2021-07-08)

### Added (1 changes)

- Protect Private Routes With Redirect Post Sign-in [EF-330]

## v1.9.1 (2021-07-07)

### Added (1 changes)

- Consolidate Identified Components According to EF-324 [EF-325]

## v1.9.0 (2021-07-01)

### Added (1 changes)

- 3rd Iteration of Channel Companies Interface [EF-323]

## v1.8.9 (2021-06-30)

### Added (1 changes)

- Second Iteration of Companies That Are Connections & Followed On Channel [EF-315]

## v1.8.8 (2021-06-24)

### Added (1 changes)

- Payment Methods To Be Disabled When Subscription Level Is Basic/Free [EF-318]

## v1.8.7 (2021-06-23)

### Added (2 changes)

- User To Be Promopted On Click Of “Import/Export Relationships” Regarding Beta [EF-317]

### Fixed (1 changes)

- added loader for unauthenticated and authenticated user in assistant-research

## v1.8.6 (2021-06-22)

### Added (2 changes)

- Suspense Spinner for Search Result Fetch - Make Obvious to User [EF-312]
- User To Be Prompted On Click Of “Add New Team Member” Regarding Beta [EF-316]

### Fixed (10 changes)

## v1.8.5 (2021-06-17)

### Added (0 changes)

### Fixed (1 changes)

- Update flow for public company view, redirects, added public company page with related search results

## v1.8.4 (2021-06-17)

### Added (1 changes)

- Second Iteration of Company Profile Presentation (After Marco/Clay Mockup) [EF-309]

### Fixed (1 changes)

- Fixed error on Company switch

## v1.8.3 (2021-06-02)

### Added (1 changes)

- Load Unauthenticated & Assisted Research Results from API Method [EF-303]

## v1.8.2 (2021-05-28)

### Added (1 changes)

- Load a Selected Company Profile Via Mixed Authentication Modes (JTW & API Key) [EF-308]

## v1.8.2 (2021-05-25)

### Added (1 changes)

- Verify User Sign-Up from "Complete My Profile" Interface [EF-301]

## v1.8.1 (2021-05-24)

### Added (3 changes)

- Hide "Resources" Tab for Channels [EF-305]
- Rename "Data" Tab to "Overview" for Channels (Update Translations) [EF-306]
- Rename "Community" Tab to "Companies" for Channels (Update Translations) [EF-307]

## v1.8.0 (2021-05-20)

### Added (0 changes)

### Fixed (1 changes)

- Ensure Signed-In User Redirected to Default Channel (Not Unauthenticated Search) [EF-304]

## v1.7.9 (2021-05-19)

### Added (1 changes)

- User Must Be Able to Delete a Channel [EF-299]

## v1.7.8 (2021-05-17)

### Added (1 changes)

- Refactor "Assisted Research -> History" To Repopulate After Changes [EF-293]

## v1.7.7 (2021-05-12)

### Added (1 changes)

- Refactor "Assisted Research" to Mimic Same Behavior as Unauthenticated Search [EF-292]

### Fixed (3 changes)

- Added the description to wizzard form steps [EF-288]
- Changed 'Follow' icon [EF-290]
- Removed the expand/collapse of the filters and always show them directly below the “Complete Profile” area [EF-297]

## v1.7.6 (2021-05-11)

### Added (1 changes)

- Change Location of Unauthenticated Sidebar Items [EF-297]
- Add "Follow" Link to Match Results [EF-290]
- Add Icon to "More Like This" Link in Match Results [EF-291]

## v1.7.5 (2021-05-07)

### Added (0 changes)

### Fixed (1 changes)

- Second iteration - Create a Dialogue to Present a "Share Link" and "Social Icons" in Unauthenticated Search Results [EF-286]

## v1.7.4 (2021-05-04)

### Added (2 changes)

- Create a Dialogue to Present a "Share Link" and "Social Icons" in Unauthenticated Search Results [EF-286]
- Make Current Match Wizard Step More Pronounced [EF-288]

## v1.7.3 (2021-04-29)

### Added (0 changes)

### Fixed (4 changes)

- Added validation on Unauthenticated Search page(Stepper Form)
- Renamed 'Search Tags' to 'Company Information', fixed validaton errors
- Moved 'Company Name' field to 'Company Information' section
- Fixed a few small issues with styles

## v1.7.2 (2021-04-27)

### Added (1 changes)

- Capture Unauthenticated Search Tags And Pass With Account Creation as Cognito Custom Variable [EF-282]

### Fixed (4 changes)

- Changed desktop view of 'Unauthenticated Search' page
- Removed 'No Channel' view, because user will have default channel which is created automatically
- Fixed redirects to setup page and get initial data with getServerSideProps
- Fixed 404 page

## v1.7.1 (2021-04-23)

### Added (1 changes)

- Make Unauthenticated Search Wizard Mobile Friendly [EF-280]

## v1.7.0 (2021-04-19)

### Added (1 changes)

- Create Initial Search Result View in Unauthenticated Search Wizard [EF-281]

### Fixed (1 changes)

- Fixed error with React UseSuspense for next-i18n

## v1.6.9 (2021-04-15)

### Added (2 changes)

- Verify "Unauthenticated" Pinpoint Events Can Be Invoked [EF-278]
- Update Unauthenticated Search Wizard [EF-279]

## v1.6.8 (2021-04-08)

### Added (0 changes)

### Fixed (2 changes)

- Added the Language and Sign-In options to the unauthenticated view
- Cleaned up, show loader after click on signIn

## v1.6.7 (2021-04-07)

### Added (1 changes)

- Research and Propose Best Way to Provide Lightweight "Assisted Research" to Unauthenticated User [EF-277]

### Fixed (1 changes)

- Auth flow, cleaned up MainLayout, added Sign In page

## v1.6.6 (2021-04-05)

### Added (1 changes)

- User Should Have Name Filter/Lookup Textbox in Dropdown Listing of User's Company Associations [EF-275]

### Fixed (2 changes)

- Updated setupNewCompany mutation(pass fullName from user)
- Updated companies list after change company name

## v1.6.5 (2021-04-01)

### Added (1 changes)

- Add Validation to SocialLink Implementations (Length > 0 && Valid URL) [EF-268]
- Update Frontend Implementation of CompanyUser to Use companyName, name, userName Separately [EF-274]

## v1.6.4 (2021-03-30)

### Added (2 changes)

- User Must Be Able to Invite a Team Member (CompanyUser) [EF-267]
- Research AWS Pinpoint and Create Test Events [EF-272]

### Fixed (1 changes)

- Fixed Invite Member step on Create New Company Page

## v1.6.3 (2021-03-26)

### Added (1 changes)

- Change "Suggested Tags" and "Advanced" to Popup Dialogue and Menu Items in Assisted Research [EF-269]

## v1.6.2 (2021-03-24)

### Added (1 changes)

- User Must Be Able to Add a New Company and CompanyUser [EF-266]
- Remove #Channels Menu Item from Account Menu (Just from Popup) [EF-270]

### Fixed (1 changes)

- Remove Comapnies page and related components
- Cleaned up MainLayout component
- Grouped methods in api/ folder

## v1.6.1 (2021-03-19)

### Added (1 changes)

- User Must Be Able to Select a Company from Those Connected in CompanyUser Collection [EF-265]

### Fixed (1 changes)

- NPM modules must be transpiled in Next.js
- Added an avatar to the account menu icon in the header

## v1.6.0 (2021-02-26)

### Added (3 changes)

- Upgrading a Paid Plan Should Redirect Use to Nexway Store With Pre-filled Profile Attributes [EF-263]
- Downgrading/Cancelling a Paid Plan Should Redirect User to Nexway Store With Pre-filled Attributes [EF-264]
- RefetchQueries vs Cache Update [EF-250]

## v1.5.9 (2021-02-25)

### Added (1 changes)

- User Can View, Keep as New, and Remove Notifications of Varied Types [EF-229]

## v1.5.8 (2021-02-24)

### Added (1 changes)

- All VisibilityLevel Selections Should Have Space Between Camel Casing [EF-261]

### Fixed (1 changes)

- Fixed error - Message: Variable 'id' has coerced Null value for NonNull type 'ID!', Location: [object Object], Path: null

## v1.5.7 (2021-02-23)

### Added (1 changes)

- Add Social Links Collection to Relationship Profile [EF-257]
- Add Terms and Conditions Sign-off to Auth Flow [EF-249]

### Fixed (0 changes)

## v1.5.6 (2021-02-22)

### Added (0 changes)

### Fixed (1 changes)

- Cleaned up Apollo config, removed 'dispatch' SIGN_IN state from useEffect, remove withApollo HOC from components
- Update React to 17.0.1

## v1.5.5 (2021-02-19)

### Added (2 changes)

- Relationship Profile Should Have Clickable WebsiteURL and Social Links With Options to "Go, Copy, or Edit." [EF-259]
- View of Relationship Contact Should Have Email Address and Any Social Links as Clickable Hrefs" [EF-256]

### Fixed (3 changes)

- When Editing Company Profile Section Name, Accordion Disabled. Cannot Exit Unless Clicking Escape Button. [EF-260]
- Changed 'Key Contacts' layout, added ability toggle the view(as list/as cards)
- Moved cache update logic from CompanyProfileSection to cache/ folder

## v1.5.4 (2021-02-17)

### Added (1 changes)

- Refactor Relationship Profile "Additional Information" Section to List All Available Custom Fields from Settings [EF-255]

### Fixed (4 changes)

- `fetch-policy` is applied only for customFileds - we'll change this behavior in the next iteration
- Moved update cache logic to `libs/cache` folder for to clean up components
- Cleaned up the Relationship's components to avoid re-rendering
- Fixed content jumping behavior when open Relationship Profile

## v1.5.3 (2021-02-15)

### Added (1 changes)

- Add/Edit Relationship Contact Must Allow User to Assign "Multiple" Social Links [EF-254]

## v1.5.2 (2021-02-12)

### Added (1 changes)

- Provide a Markdown Editor for Adding and Editing Relationship Notes [EF-252]
- Research Social Linking to CompanyUsers in Relationship Notes [EF-253]

### Fixed (1 changes)

- Changed to the new textEdior in Company Profile Section Item
- Moved Company Profile to containers folder

## v1.5.1 (2021-02-09)

### Added (1 changes)

- Add Functionality to "Delete" One or More Relationships (By ID List or Current Filters) [EF-225]

## v1.5.0 (2021-02-08)

### Added (1 changes)

- Add Functionality to Manage CompanyRelationship "Key Contacts" (Add/Edit/Delete) [EF-211]

## v1.4.9 (2021-02-06)

### Added (1 changes)

- Add Functionality to Manage CompanyRelationship "Notes" (Add/Edit/Remote) [EF-214]

## v1.4.8 (2021-02-03)

### Added (1 changes)

- User Can Import Existing Relationships From CSV Upload [EF-222]

## v1.4.7 (2021-01-29)

### Added (1 changes)

- Add Functionality to "History" in Assisted Research [EF-216]

## v1.4.6 (2021-01-27)

### Added (1 changes)

- Add Country Attribute to CompanyRelationship Type [EF-227]

## v1.4.5 (2021-01-26)

### Added (1 changes)

- User Can Configure a Custom Field (Configuration & Presentation) [EF-228]

## v1.4.4 (2021-01-21)

### Added (1 changes)

- Added Italian, Portuguese translations

### Fixed (3 changes)

- Correct Spelling of Standard Tag Labels [EF-194]
- Fixed bug after switch language
- Fixed bug on relationship profile - tags "Ralationship Source" and "Standard Tags" weren't saved

## v1.4.3 (2021-01-20)

### Added (0 changes)

### Fixed (1 changes)

- Needs Safari Compatibility for the Application Sign-Up Page [EF-219]
- Header component (refactoring) [EF-226]

## v1.4.2 (2021-01-19)

### Added (1 changes)

- In "Assisted Research," Bind the "Resources" Filter to the "ResourceType" Enumberation [EF-199]

### Fixed (1 changes)

- Sign-In Dialogue Too Big for Mobile Viewport [EF-224]

## v1.4.1 (2021-01-16)

### Added (1 changes)

- Updating a Relationship (Profile) Should Data Bind to Corresponding "CustomerRelationship" Item [EF-196]

## v1.4.1 (2021-01-15)

### Added (1 changes)

- Relationship List Should Map to Collection of Company.relationships [EF-197]

### Fixed (1 changes)

- Update cache on create new relationship

## v1.4.0 (2021-01-14)

### Added (1 changes)

- Adding a Relationship Should Create New "CompanyRelationship" Item [EF-195]

## v1.3.9 (2021-01-12)

### Added (2 changes)

- Add Data Bindings for Relationship Settings Tab With Save and Reset [EF-192]
- Populate Filters on Relationship List Tab With New Company Definitions By Type [EF-193]

## v1.3.8 (2021-01-05)

### Added (1 changes)

- Create "Add Relationship" Dialogue Per Mockup [EF-188]

### Fixed (0 changes)

## v1.3.7 (2021-01-04)

### Added (1 changes)

- Create Selected "Relationship" Profile Per Mockup [EF-187]

### Fixed (0 changes)

## v1.3.6 (2020-12-28)

### Added (1 changes)

- Bind Location to Company Profile [EF-186]

### Fixed (0 changes)

## v1.3.5 (2020-12-27)

### Added (3 changes)

- Change "Checkbox Dropdown" Implementation [EF-184]
- In "Assisted Research," Move "Suggest" Tags Dropdown Into Tags Area [EF-185]
- User Must Be Able to Delete a Company Profile Section [EF-183]

### Fixed (0 changes)

## v1.3.4 (2020-12-24)

### Added (4 changes)

- User Must Be More Aware of Load Progress Between Page Routes [EF-182]
- Account Menu Should Include Items for Company When Viewing User Profile Interfaces [EF-183]
- Ensure Consistent Placement of User Action Buttons Across Application [EF-189]
- Language Selection to Include a Space Between Words And Be Link Buttons Without Background Color [EF-179]

### Fixed (0 changes)

## v1.3.3 (2020-12-22)

### Added (0 changes)

### Fixed (1 changes)

- Some Components Load Visibility Remain In Awkward State On Entry, i.e. Sign-In, Channel, etc. [EF-181]

## v1.3.2 (2020-12-16)

### Added (1 changes)

- Add a Main & Popup Menu Item and Page Route for "Assisted Research" [EF-176]

### Fixed (1 changes)

- updated NextJS to the last version, updated Links

## v1.3.1 (2020-12-11)

-Enhance Selection of "Market" Tags to Include a Topology Map for Selection [EF-174]

### Added (1 changes)

### Fixed (0 changes)

## v1.3.0 (2020-12-08)

### Added (4 changes)

- Improve Responsiveness of Company Profile & Settings Tabs for Mobile Viewport [EF-168]
- Portal Pages Now Seem to Show Regardless of Subscription. Should Be Limited to Expandigo "Portal" Subscription. [EF-172]
- Clicking Button to Add Channel Seems to Not Provide Text Field for Name Now [EF-169]
- Switch Order of Menu Items in Main Menu and Popup Menu [EF-178]
- Some Components Are Visible When Loading Before Conditionally Hidden. Example "Sign In" and "Channel Settings." [EF-173]

### Fixed (0 changes)

## v1.2.9 (2020-12-07)

### Added (1 changes)

- Create a Public, Unauthenticated Page Route for Preview of a Company Profile, With Visibility Restrictions Enforced [EF-163]

### Fixed (0 changes)

## v1.2.8 (2020-11-24)

### Added (4 changes)

- When User Signs Up, They Must Complete Setup Route Before Seeing Main Menu Items. [EF-155]
- After Setup Complete, User Should Be Taken to Company Profile, And Main Menu Items Are Visible. [EF-156]
- After Setup Complete, a Default Channel Is Created w/ Same Company Tags. Named #Home. [EF-157]
- User Should Be Able To Edit Name of Channel Inline [EF-152]
- Edit Channel Menu Item Does Not Work. Should Take User to Channel Tags Tab [EF-153]

### Fixed (0 changes)

## v1.2.7 (2020-11-16)

### Added (1 changes)

- Verify Password Change in User Profile -> Security [EF-147]

### Fixed (0 changes)

## v1.2.6 (2020-11-12)

### Added (1 changes)

- User Should Be Able to Update Tags for Channel (Settings) [EF-111]

### Fixed (1 changes)

- FIXED - An Authorized User for Team Members (CompanyUsers) Must Be Able to Update the UserPolicy [EF-149]

## v1.2.5 (2020-11-12)

### Added (1 changes)

- User Should Be Able to Edit/Save Tags for Company (Profile) UI [EF-100]

### Fixed (0 changes)

## v1.2.4 (2020-11-10)

### Added (2 changes)

- Make Visibility Level on Company Inline Selection Also [EF-151]
- Remove Ability to Edit Username from User Profile [EF-148]

### Fixed (1 changes)

- inline visibility switcher - refactoring

## v1.2.3 (2020-11-09)

### Added (2 changes)

- An Authorized User for Team Members (CompanyUsers) Must Be Able to Update the UserPolicy [EF-149]
- Edit of ProfileSectionItem Currently Results in Error [EF-146]

### Fixed (1 changes)

- User With Owner Role for the Current Company Should Be Able to Edit Team Member[EF-105]

## v1.2.2 (2020-11-02)

### Added (0 changes)

### Fixed (0 changes)

- Fix avatar logo upload
- Sample images for demo.

## v1.2.1 (2020-10-30)

### Added (3 changes)

- Develop a Method for an Inline Edit of Company Profile Fields [EF-144]
- If EF-144 Successful, Consider Feasibility of Making CompanyProfileSection Heading (Name) Editable Inline [EF-145]
- When User Clicks to Add Channel, A Channel Must Be Created [EF-134]

### Fixed (0 changes)

## v 1.2.0 (2020-10-29)

### Added (2 changes)

- Avatar upload now happens in a popup, proper styles for the cropper [EF-118]
- Now only companies with Expandigo Portal subscription levels show pages in sidebar [EF-127]

## v1.2.0 (2020-10-28)

### Added (0 changes)

### Fixed (1 changes)

- fixed orderIndex issue - cache is updated after mutation

## v1.1.9 (2020-10-27)

### Added (3 changes)

- User Should Be Able to Change VisibilityLevel of CompanyProfileSection without Clicking Edit Option [EF-141]
- When User Expands a CompanyProfileSection, Other Accordions Should Collapse [EF-142]
- The "Company Details" Table Heading Is Not Useful. Replace With VisibilityLevel Badget [EF-143]

### Fixed (0 changes)

## v1.1.8 (2020-10-26)

### Added (3 changes)

- Mail Icon to Take User to Simple/Temporary Interface of Messages for Preview Participants (Release Notes) [EF-128]
- When User Is Associated With Just 1 Company, Hide The <- Icon and Disable Click to List of Companies [EF-140]
- Footer On Sign-In Should Be Full Width Since Drawer Not Visible [EF-125]

### Fixed (0 changes)

## v1.1.7 (2020-10-25)

### Added (1 changes)

- First Pass at Creative UI Cleanup of Company Profile & Sections [EF-139]

### Fixed (0 changes)

## v1.1.6 (2020-10-23)

### Added (2 changes)

- User Must Be Able to Move up/down Section Items in a Company Profile Section [EF-120]
- Match Section Items Available for QuickAdd to Section Type [EF-126]

### Fixed (0 changes)

## v1.1.5 (2020-10-22)

### Added (4 changes)

- User Must Be Able To Edit Section Item on Company Profile Sections [EF-119]
- User With Owner Role for the Current Company Should Be Able to Edit Team Member [EF-105]
- User Should Be Able to Update Security Settings (Username, Password) Using Auth API [EF-102]
- Clean-up For Mobile/Tablet Responsiveness [EF-101]

### Fixed (0 changes)

## v1.1.4 (2020-10-16)

### Added (3 changes)

- Fetching AWS Configuration Should Come From https://develop-global.expandigo.com/config [EF-95]
- Need Ability to Persist Order of Company Profile Sections [EF-108]
- Need Ability to Persist Ordering of Pages [EF-107]
- Need Ability to Persist Ordering of Channels [EF-98]

### Fixed (1 changes)

- channel & portalPages list refactoring
- Application Randomly Refreshes [EF-93]

## v1.1.3 (2020-10-13)

### Added (3 changes)

- User Should Be Able to Add/Edit/Remove "Custom" Profile Section Item [EF-110]
- Dropdown List Values for ResourceType, ConnectionStatus, Etc. Must Come From Locale JSON [EF-106]
- User Needs to Upload and Edit User Avatar (on User Profile) [EF-64]

### Fixed (0 changes)

## v1.1.2 (2020-10-08)

### Added (1 changes)

- User Should Be Able to Update VisibilityLevel for Company (Profile) In Settings [EF-112]

### Fixed (0 changes)

## v1.1.1 (2020-10-07)

### Added (4 changes)

- Visibility level for company section [EF-113]
- Accessibility [EF-90]
- Map page gadgets [EF-58]
- i18n json translation files [EF-82]

### Fixed (3 changes)

- Additional UI updates to handle suggested items visually.
- Fixes for primary color conflicts in theme
- Updated branding

## v1.1.0 (2020-10-01)

### Added (1 changes)

- Continue with Company Setup, added Footer, selects with autocomplete

### Fixed (0 changes)

## v1.0.9 (2020-09-30)

### Added (3 changes)

- Starting UI for New Company Setup
- User Should Be Able to Delete a Profile Section Item (Name/Value) [EF-77]
- Sign-Up "Forgot Password Hint" Field Must Have Custom Hint Control Built w/ Translation Hook [EF-68]

### Fixed (1 changes)

- fixed create&deletProfileSection mutations

## v1.0.8 (2020-09-29)

### Added (2 changes)

- Fix Menu Item for User Preferences to Match Sidebar Target [EF-92]
- Company Profile Button In Main Menu Should Also Take User to Company Profile, Just As the Sidebar Menu Does [EF-74]
- Add Tooltips to Actions That Reveal Additional Content in Other Containers [EF-89]
- First pass to follow-pattern and realign for adding data insights. [EF-85]

### Fixed (0 changes)

## v1.0.8 (2020-09-28)

### Added (2 changes)

- User Should Be Able to Move a Company Profile Section (Up/Down - Drag & Drop?) [EF-79]
- Ensure All Labels, Buttons, Headers, Etc. Use i18n Translation Hook and Have en-US JSON Locale File [EF-67]

### Fixed (4 changes)

- fixed createProfileSection mutation
- component refactoring
- remove unused packages
- migrating to Apollo Client 3.0

## v1.0.8 (2020-09-23)

### Added (3 changes)

- User Should Be Able to Edit a Company Profile Section (Rename Only) [EF-78]
- User Should Be Able to Delete a Company Profile Section [EF-76]
- User Should At Any Time Be Able to Request Help Via Zendesk "Guide" Widget [EF-60]

### Fixed (0 changes)

## v1.0.7 (2020-09-22)

### Added (2 changes)

- Create Baseline Component for Selected Company's "Team Members" (Company.users) [EF-57]
- User Should Be Able to Save Company Profile Overview Attributes (Name, Description, etc.) [EF-80]

### Fixed (0 changes)

## v1.0.6 (2020-09-18)

### Added (3 changes)

- User Should Have Ability to Edit & Save User Preferences [EF-42]
- Create a Baseline Component for a ChannelConnection [EF-51]
- Create a Baseline Component for a ChannelResource [EF-52]

### Fixed (0 changes)

- Some simple cosmetic updates

## v1.0.6 (2020-09-17)

### Added (1 changes)

- User Should Should Have Ability to Edit & Save User Profile [EF-41]

### Fixed (0 changes)

## v1.0.5 (2020-09-16)

### Added (1 changes)

- Create Baseline Component for Company Profile (Company & Company.profileSections) [EF-56]

### Fixed (0 changes)

## v1.0.4 (2020-09-15)

### Added (1 changes)

- Clicking of # Top-Nav Button or #Desktop in Main Menu Should Take User to Company & Channel In Context (Last Selected) [EF-45]

### Fixed (2 changes)

- Feature/fix sign up with username
- Edit Page Should Take User to That Page's Settings Tab Instead of Popup

## v1.0.4 (2020-09-14)

### Added (2 changes)

- Edit Channel Should Take User to That Channel's Settings Tab Instead of Popup. [EF-49]

### Fixed (3 changes)

- fixed error related to update state on change dynamic routes
- fixed error related close menu after click on one of the item
- refactoring action menu

## v1.0.3 (2020-09-11)

### Added (3 changes)

- User Should Arrive at Default Company & Default Channel at Sign-In [EF-44]
- Map Company Listing to Companies Assigned to Current User In User.companies [EF-46]
- Map Available Channels to Selected Company in Company.channels. [EF-47]

### Fixed (0 changes)

## v1.0.2 (2020-09-08)

### Added (1 changes)

- Configured client instead of aws-appsync package with ability to connect to aws use apollo/react-hooks and Apollo Client 3.0 [EF-39]

### Fixed (0 changes)

## v1.0.1 (2020-09-03)

### Added (1 changes)

- User Must Be Able to Reposition a Page in the List of Company Pages [EF-37]

### Fixed (3 changes)

- refactored DnD component
- removed separate page for Company and made The "Data Insights" for a selected "Channel" as the dashboard for Company
- refactored Channels and Pages components

## v1.0.0 (2020-09-02)

### Added (1 changes)

- Create a Baseline Component for a Channel (markup) [EF-22]

### Fixed (1 changes)

- Consolidate top three elements (Back to Companies, Company, Company Name) for screen real estate [EF-19]
