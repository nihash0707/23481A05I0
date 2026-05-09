# Stage 1

## Priority Inbox Approach

To build the Priority Inbox, I wanted to avoid hitting the database too much for sorting since notifications come in frequently. So I implemented the logic in the frontend to handle the sorting and prioritization.

My approach was to assign a weight to each notification type:
- Placement = 3 (most important)
- Result = 2
- Event = 1

When I fetch the data, I first sort the array based on this weight. If there are multiple notifications with the same weight (like two Placement notifications), I fall back to checking the timestamp so the newest one shows up first. 

### How to handle new notifications efficiently

If new notifications keep streaming in, doing a full `array.sort()` every single time might get slow if the array is huge. 

To handle keeping the top 10 efficiently without re-sorting everything:
1. I would just keep the current top 10 in a state or memory array.
2. When a new notification comes in, check its weight against the lowest item in our top 10.
3. If it has a higher priority (or same priority but newer), we just insert it into our array and pop off the last item. 

This way we don't need a heavy DB query and we avoid expensive frontend sorts on large lists. For this stage's React implementation, I'm fetching the list, sorting it with the weights, and then just slicing the array to the user's `limit` input.
