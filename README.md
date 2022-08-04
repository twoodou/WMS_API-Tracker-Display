# Custom Warehouse Management System

Backend API is setup using express.js and MySQL, although it wouldn't be difficult to configure another DB.  Frontend uses React.

This application was made to track progression of products through the manufacturing process.  I set up workstations at each department (using Raspberry Pi's and Barcode Scanners), so that an employee could scan the BOM Routing Ticket, which would timestamp and 'move' the Routing to the next manufacturing process.  This enabled me to track time spent in each department, and made finding WIP much easier.

Each 'department' workstation has a unique Landing Page.

The app also includes a display screen for our Shipping Department.  This screen is a realtime view of:
- Number of UPS boxes shipped/day
- Number of FedEx boxes shipped/day
- Total boxes shipped per day
- Number of dropshipped packages

This Shipping Tracker screen was a huge benefit to our team.  It was naturally a quick-view performance indicator for our leadership team, but also a competition-driver for our shipping employees in that they were always trying to set new records.

This worked wonders for my occupation as Director of Production, so I am hoping that it will help others in the same way.

I hope some of you can take this idea and implement in your manner for similar results.  Enjoy!

-Thomas