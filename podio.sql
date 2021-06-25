-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2020 at 07:08 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `podio`
--

-- --------------------------------------------------------

--
-- Table structure for table `destination_daily`
--

CREATE TABLE `destination_daily` (
  `uodate_id` int(11) NOT NULL,
  `notif_id` varchar(100) NOT NULL,
  `destination` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `destination_daily`
--

INSERT INTO `destination_daily` (`uodate_id`, `notif_id`, `destination`) VALUES
(0, '1393483383', 'ODD TESTING'),
(0, '1393483383', 'MARK TESTING GC'),
(0, '1393837897', 'TOOLS DEV'),
(0, '1393836923', 'SALES ORG BIZDEV MARKETING'),
(0, '1393836923', 'ACCOUNTING PA TEAM'),
(0, '1393836923', 'ACCOUNTING TOP OAI'),
(0, '1393836923', 'A2B HELP'),
(0, '1393836923', 'A2B FOREVER 2020'),
(0, '1393836923', 'MEETING FOLLOW UP'),
(0, '1393836923', 'MEETING MONITORING'),
(0, '1393836923', 'SOX B GROUP'),
(0, '1393836923', 'PA TEAM'),
(0, '1393836923', 'TOOLS DEV'),
(0, '1393836923', 'NET SUITE NINJAS'),
(0, '1409616329', 'MARK TESTING GC');

-- --------------------------------------------------------

--
-- Table structure for table `pa_sox`
--

CREATE TABLE `pa_sox` (
  `id` int(10) NOT NULL,
  `client` varchar(100) NOT NULL,
  `_2_status_update` varchar(100) NOT NULL,
  `_2_percent_completion` varchar(100) NOT NULL,
  `_2_status` varchar(100) NOT NULL,
  `_3_client_calls_this_week` varchar(100) NOT NULL,
  `_3_percent_status` varchar(100) NOT NULL,
  `_3_status` varchar(100) NOT NULL,
  `_4_client_calls_next_week` varchar(100) NOT NULL,
  `_4_percent_completion` varchar(100) NOT NULL,
  `_4_status` varchar(100) NOT NULL,
  `_5_total_oai` varchar(100) NOT NULL,
  `_5_percent_completion` varchar(100) NOT NULL,
  `_5_status` varchar(100) NOT NULL,
  `_6_top_3_priority` varchar(100) NOT NULL,
  `_6_percent_completion` varchar(100) NOT NULL,
  `_6_status` varchar(100) NOT NULL,
  `_7_prepare_this_week` varchar(100) NOT NULL,
  `_7_percent_completion` varchar(100) NOT NULL,
  `_7_status` varchar(100) NOT NULL,
  `_8_prepare_next_week` varchar(100) NOT NULL,
  `_8_percent_completion` varchar(100) NOT NULL,
  `_8_status` varchar(100) NOT NULL,
  `created_on` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pa_sox`
--

INSERT INTO `pa_sox` (`id`, `client`, `_2_status_update`, `_2_percent_completion`, `_2_status`, `_3_client_calls_this_week`, `_3_percent_status`, `_3_status`, `_4_client_calls_next_week`, `_4_percent_completion`, `_4_status`, `_5_total_oai`, `_5_percent_completion`, `_5_status`, `_6_top_3_priority`, `_6_percent_completion`, `_6_status`, `_7_prepare_this_week`, `_7_percent_completion`, `_7_status`, `_8_prepare_next_week`, `_8_percent_completion`, `_8_status`, `created_on`) VALUES
(1, 'McGrath', 'Testing Status Phase 1 - 13 Controls4 Ready for 2nd Level Review3 In Progress4 In Progress (Pending ', '50%', 'In Progress', '2 call', '100%', 'Completed', 'None', '0%', 'None', '4 New OAIs', '40%', 'In Progress', 'Obtain pending PBC&#39;s.Phase 1 Testing.', '60%', 'In Progress', 'Same as top prio', '60%', 'In Progress', 'Same as top prio', '60%', 'In Progress', '2020-05-02'),
(2, 'Low Income Investment Fund', 'ERMPOC Lists sent to Client for validation', '25%', 'In Progress', 'None', '0%', 'None', 'None', '0%', 'None', '10 In Progress OAIs', '20%', 'In Progress', 'Send Intro email and Schedule Interview to POC&#39;s.Draft Agenda for the meeting.', '20%', 'In Progress', 'Same as top prio', '20%', 'In Progress', 'Same as top prio', '20%', 'In Progress', '2020-05-02'),
(3, 'Fastly', 'Schedule meeting for FA, TCM, Tax, ELC and HRP.                     Update OTC RCM and plan for addi', '0%', 'n/a', 'Project status update with Fastly', '100%', 'Done', 'Project status update with Fastly', '0%', 'n/a', 'Total of 22.14 New.8 In progress.', '40%', 'In progress', 'Schedule meeting for FA, TCM, Tax, ELC and HRP.Update OTC RCM and plan for additional OTC discussion', '0%', 'n/a', 'WPS agenda', '80%', 'in progress', 'Same as top 3 priority.', '0%', 'n/a', '2020-05-02'),
(4, 'Low Income Investment Fund', 'Compliance Audit : ClosedSend the Compliance Audit to the ClientFollow up if the last bill was recei', '100%', 'Completed and project closed.', 'None', '0%', 'None', 'None', '0%', 'None', 'None', '0%', 'None', 'None', '0%', 'None', 'None', '0%', 'None', 'None', '0%', 'None', '2020-05-02'),
(5, 'Techpoint Inc', 'Flowcharts RCM Risk Assessment', '75%', 'Ongoing review of 9 processes, 2 process in progress- TAX and ELCIn progress 75 %', '5 process meeting', '100%', 'done-5 process meetings', 'none', '0%', 'none', '13 in progress', '60%', 'process interview open items- waiting on client', 'FLowchart RCMRisk Assessment', '60%', 'Ongoing review of 9 processes, 2 process in progress- TAX and ELCIn progress 75 %', 'Flowcharts RCM DraftRisk Assessment', '60%', 'Ongoing review of 9 processes, 2 process in progress- TAX and ELCIn progress 75 %', 'Complete review of Flowcharts RCM', '60%', 'on going review', '2020-05-02'),
(6, 'Cortexyme Inc', 'Check in meeting agenda sent to clientInternal Weekly Status Update', '100%', 'completedcompleted', 'none', '0%', 'none', 'Call | A2Q2 Cortexyme Check In meeting', '0%', 'Scheduled May 4, 4:00PM', '2 open', '80%', 'In progress- to be discussed on Monday-check in call', 'COSO MappingSOD AnalysisSchedule WT meetings', '40%', '-to send to client next week-to discuss with client on Monday-to schedule after May 15', 'Agenda for Check in call', '100%', 'completed', 'COSO Mapping', '60%', 'To send to client nextweek', '2020-05-02'),
(7, 'ERI', '2020 Narrative updates - A2Q2\'s suggestion sent to Brandon2/3 AX Control Change Review Calls with Se', '75%', 'In Progress', 'Call | A2Q2 - ERI - AX Control Change Review | Apr 27 9:30-10:30 AMCall | INT | ERI - AX Control Cha', '80%', 'In Progress', 'Call | A2Q2-ERI Weekly Status | Every Thurs 10:00 AM-10:30 AM', '0%', 'Not Started', 'Total 13 OAI&#39;s as of 8PM, 8 New, 3 In Progress, 2 Waiting for review', '40%', 'In progress', 'AX Control Change Meeting RequestsUpdate of OAIsRisk Assessment request PBC', '60%', 'In Progress', 'AX Control Change Meeting RequestsUpdate of OAIsRisk Assessment request PBC', '60%', 'In Progress', 'Risk AssessmentAX Reimplementation Schedule of Walkthroughs', '0%', 'Not Started', '2020-05-01'),
(8, 'Low Income Investment Fund', 'ERMPOC list sent to client for validation.', '25%', 'Waiting for Client response', 'None', '0%', 'None', 'None', '0%', 'None', '10 In Porgress', '20%', 'In Progress', 'Send Intro email and Schedule Interview to POC&#39;s.Draft Agenda for the meeting.', '20%', 'In Progress', 'Same as the top prio', '20%', 'In Progress', 'Same as top prio', '20%', 'In Progress', '2020-05-01'),
(9, 'Low Income Investment Fund', 'Compliance Audit Sent to Client', '100%', 'Waiting for Client Response', 'None', '0%', 'None', 'None', '0%', 'None', 'None', '0%', 'None', 'None', '0%', 'None', 'None', '0%', 'None', 'None', '0%', 'None', '2020-05-01'),
(10, 'McGrath', 'Testing Status Phase 1:Total og 13 Controls6 Ready for 2nd Level Review1 In Progress4 In Progress (P', '50%', 'In Progress', '2 calls', '100%', 'Completed', 'None', '0%', 'None', '4 New OAIs', '40%', 'In Progress', 'Obtain pending PBC&#39;s.Phase 1 Testing.', '40%', 'In Progress', 'Same as the top prio', '40%', 'In Progress', 'Same as the top prio', '20%', 'In Progress', '2020-05-01'),
(11, 'Techpoint Inc', 'Process MeetingsFlowchart RCMOAI Weekly call', '75%', 'COmpleted 16 out of 16 process meetings9 Flowcharts ready for review2 in progress- TAX and ELCOAI we', 'none', '0%', 'all completed process interviews', 'none', '0%', 'none', '10 open6 closed', '60%', 'open oais- process interview open items- sent follow up to client', 'Review and complete drafts of Flowchart RCM', '60%', 'Reviewer list updated- added Ms.Lynne,Ms,Laurie and Sir CharlieTester to continue drafting flowchart', 'Review and complete drafts of Flowchart RCM', '80%', 'Reviewer list updated- added Ms.Lynne,Ms,Laurie and Sir CharlieTester to continue drafting flowchart', 'Flowcharts RCM', '80%', 'Continue drafting flowchart RCM once received Open items from Client', '2020-05-01'),
(12, 'Cortexyme Inc', 'Check in Call', '50%', 'Scheduled check in call on May 4 2020 4PM', 'none', '0%', 'none', 'A2Q2 Cortexyme Check in Meeting', '60%', 'invites sent and accepted- May 4 4PM', '2', '80%', '2 in progress1- Schedule WT meeting- after May 152. COSO Mapping- prepared and to be sent later toge', 'Check in meetingWT Schedules', '60%', 'scheduledto be schedule May 15 onwards', 'Agenda for check in call', '40%', 'To send to Ms.Lynne for review', 'WT Schedule dates', '40%', 'PA collated availablity of Ms.Kim, Ms.Lynne and SIr Charlie, to send list nextweek for client confir', '2020-05-01'),
(13, 'Cepheid', 'Sample selection US 12.01b - client delivered PBCs 5/7, US 21.02, US 22.01 – email drafted, for Ms L', '100%', 'completed', 'None', '0%', 'None', 'None', '0%', 'None', '0', '0%', 'None', 'Update Testing Status, send to the teamSave PBCs in ShareFile as receivedContinue Testing for US con', '0%', 'in progress', 'PBCs to save in SFUpdate Testing Status', '0%', 'in progress', 'None', '0%', 'none', '2020-05-01'),
(14, 'Fastly', 'PTP sent to client yesterday afternoon', '100%', 'OAI tracker up-to-date', 'Call | A2Q2- Fastly Weekly Status Update every Wednesday, 2PM to 2:30PM.', '100%', 'Completed', 'Call | A2Q2- Fastly Weekly Status Update every Wednesday, 2PM to 2:30PM.', '0%', 'Open', '14 New8 In progress', '60%', 'N/A', 'Schedule meeting for F A, TCM, Tax, E L C and HRP.Update OTC RCM and plan for additional OTC discuss', '0%', 'N/A', 'N/A', '0%', 'N/A', 'Same as top 3 priority.', '0%', 'N/A', '2020-04-30'),
(15, 'Cepheid', ' 3 controls pending sample selection: 12.01b – samples sent to client, 21.02 ans 22.01 – for Ms Lil', '100%', 'Completed', 'Call | INT | Cepheid Sync with Ms LF and LM | 4pm', '100%', 'Completed', 'None', '0%', 'None', '0', '100%', 'None', 'Continue Interim Testing', '20%', 'in progress', 'Update testing status', '0%', 'in progress', 'None', '0%', 'None', '2020-04-30'),
(16, 'ERI', 'Risk Assessment PBC waiting to be received from clientOn going AX Reimplementation Control Change ca', '25%', 'In Progress', 'Call | A2Q2 - ERI - AX Control Change Review | Apr 27 9:30-10:30 AMCall | INT | ERI - AX Control Cha', '40%', 'In progress', 'Call | A2Q2-ERI Weekly Status | Every Thurs 10:00 AM-10:30 AM', '0%', 'Not Started', 'Total 13 OAI&#39;s as of 8PM, 8 New, 3 In Progress, 2 Waiting for review', '40%', 'On going', 'AX Control Change Meeting RequestsUpdate of OAIsRisk Assessment request PBC', '40%', 'On going', 'AX Control Change Meeting RequestsUpdate of OAIsRisk Assessment request PBC', '40%', 'AX Control Change Meeting RequestsUpdate of OAIsRisk Assessment request PBC', 'Risk AssessmentAX Reimplementation Schedule of Walkthroughs', '0%', 'On going', '2020-04-30'),
(17, 'Techpoint Inc', 'Process Interview meetingsDraft Flowchart and RCMTechpoint AC deck', '75%', 'completed 15 out of 16 process meetings (ELC scheduled tom 04.30)Ready for review- ESA, FA, PTP, OTC', 'ELC Process INterview', '60%', 'Scheduled tom, 04.30 2PM-3PM', 'none', '0%', 'none', '10', '60%', 'in progress- sent follow up email to client', 'To complete Process Interviews for 11 processesTo complete review of Flowcharts RCMTo complete and s', '80%', '15 out of 16 meetings completedReady for review- ESA, FA, PTP, OTC,TCM and INVClearing comments- HRP', '15 out of 16 meetings completedReady for review- ESA, FA, PTP, OTC,TCM and INVClearing comments- HRP', '80%', '15 out of 16 meetings completedReady for review- ESA, FA, PTP, OTC,TCM and INVClearing comments- HRP', 'Continue Drafting and Complete review of Flowcharts and RCM', '80%', 'Ready for review- ESA, FA, PTP, OTC,TCM and INVClearing comments- HRPIn progress- FCR,TAX , ITGC and', '2020-04-30'),
(18, 'Cortexyme Inc', 'Cortexyme Check In meeting', '50%', 'Scheduled on May 4, 4:00 PM, invites sent', 'none', '0%', 'none', 'Call | A2Q2 Cortexyme Check In meeting', '40%', 'May 4 ,2020, 4 PM', '2', '60%', '2 OAIs in progress', 'Check in meetingWT shedules', '60%', 'Scheduled on May 4To schedule after May 15 as per client\'s request', 'Check In meeting', '40%', 'invites sent', 'Wt Schedules', '60%', 'To proposed WT meeting schedule for each processes after May 15', '2020-04-30'),
(19, 'Fastly', 'Had a meeting with Fastly client for Project Status callClean up for all processes on flowchart and ', '100%', 'n/a', 'Project Status call weekly', '100%', 'n/a', 'none', '0%', 'n/a', 'Total of 18 OAI&#39;s.Added 15', '20%', 'In progress', 'Schedule meeting for F A, TCM, Tax, E L C and HRP.Update OTC RCM and plan for additional OTC discuss', '0%', 'Open', 'none', '0%', 'n/a', 'Same as the top 3 priority', '0%', 'n/a', '2020-04-29'),
(20, 'McGrath', '13 Controls are being Tested in Phase 16 Ready for 2nd Level Review1 In progress4 In Progress (Pendi', '50%', 'In Progress', '2 Completed', '100%', 'Completed', 'None', '0%', 'None', '4 New', '40%', 'In Progress', 'Obtain pending PBC&#39;s.Continue Phase 1 Testing.', '60%', 'In Progress', 'Same as top prio', '60%', 'In Progress', 'Same as the top prio', '40%', 'In Progress', '2020-04-29');

-- --------------------------------------------------------

--
-- Table structure for table `sales_invoice`
--

CREATE TABLE `sales_invoice` (
  `invoice_id` int(11) NOT NULL,
  `customer_name` varchar(50) NOT NULL,
  `invoice_number` varchar(50) NOT NULL,
  `invoice_amount` varchar(50) NOT NULL,
  `due_date` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `skype_notification`
--

CREATE TABLE `skype_notification` (
  `notif_id` int(10) NOT NULL,
  `title` varchar(50) NOT NULL,
  `message` longtext NOT NULL,
  `time` varchar(20) NOT NULL,
  `frequency` varchar(50) NOT NULL,
  `destination` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `skype_notification`
--

INSERT INTO `skype_notification` (`notif_id`, `title`, `message`, `time`, `frequency`, `destination`) VALUES
(1393483383, 'Testing Multiple Notification Group Chat', 'Testing Multiple Notification Group Chat \nTesting Multiple Notification Group Chat \n', '5:15 PM', 'Daily', 'ODD TESTING'),
(1393836923, 'ODD Document Reminder', '===ODD Document Reminder=== \nWhen we have documentation then we can send to the team on a similar task and they can go from there. If we have to go back to the person who created the automation to fix or do maintenance on it, then it defeats the purpose of automating it. Because then there will still be a manual part of it on the creator\'s end. It also defeats the growth of the creator. If he/she has to go in and work on what he/she has already completed, then he/she is not really moving forward and just doing maintenance. \n\nThat is why we need documentation. For reference purposes and so we pass on the maintenance part of it. So that they learn from it we all can move along and not get stuck doing tasks/projects we already know.\n\nA thought... Would I want to stay changing tires of a car instead of moving on to becoming a mechanic? And of course, the pay goes with the skill of the worker. Mechanic gets bigger pay than a tire changer. Simple as that', '9:00 AM', 'Daily', 'SALES ORG BIZDEV MARKETING'),
(1393837897, 'Company Intellectual Property Policy', '===Company Intellectual Property Policy=== \n&nbsp;Please be reminded of our policy regarding property rights or work-related products for the company and within the company\'s scheduled time. This is also in the Contract Agreement that we have signed. \n\n&nbsp;Any project FUNDED for and/or work or development that is TIME PAID for by the company is Company Property and should remain within the company provided premises or storage mediums. Furthermore, any activity, projects, and or work should be done in the provided remote PCs or on any company approved and provided tools and software accounts ONLY. And that nobody should be using nor saving any work, projects, deliverable, or any company data, apps and tools in their personal accounts or PCs unless approved by the CEO. \n\n&nbsp;Failure to comply would mean a breach of the terms and conditions stated in the Contract Agreement and the company policy on Company Intellectual Property security and will be dealt with accordingly. \n\n&nbsp;Thank you.', '2:00 PM', 'Daily', 'TOOLS DEV'),
(1409616329, 'OT Daily Reminder', '@all\n\n* For those EXTENDING their shifts today, FILE your OT \n\n* For those rendering OT on WEEKENDS, FILE your OT\n\n* UPDATE your RESPECTIVE PROJECT GC of your progress an hour before logging off.\n\n*** SCREENSHOTS - completed task of the day', '4:30 PM', 'Daily', 'MARK TESTING GC');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pa_sox`
--
ALTER TABLE `pa_sox`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales_invoice`
--
ALTER TABLE `sales_invoice`
  ADD PRIMARY KEY (`invoice_id`);

--
-- Indexes for table `skype_notification`
--
ALTER TABLE `skype_notification`
  ADD PRIMARY KEY (`notif_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pa_sox`
--
ALTER TABLE `pa_sox`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `sales_invoice`
--
ALTER TABLE `sales_invoice`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `skype_notification`
--
ALTER TABLE `skype_notification`
  MODIFY `notif_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1409616330;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
