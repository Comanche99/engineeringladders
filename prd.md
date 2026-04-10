

## Product goal

Create a simple, polished interface that lets a user **build a new framework visually**. This is only the first version of the framework creation experience, so keep it narrow and implementation-friendly.

## In scope

Implement only the following capabilities:

### 4.1 Framework Definition

The user must be able to define:

- **Job Role Profile ** (for example: L1 Junior Engineer, L2 Engineer,L3 Senior Engineer etc..)
- Career framework Dimensions / Skills such as Influence, People, Process, Technology and system
- Names levels (progression) per dimension 
- **Expectation mapping** from:
    - Role  × Dimension → Expected Level

### 4.2 Ladder Creation & Management

The user must be able to:

- Create a new framework
- Define its dimensions
- Define its levels
- Define behavioural expectations for each dimension at each level
- Save the framework as a draft
- View the framework in a clear structured layout after creation

## Out of scope

Do not build anything outside this narrow scope:

- No scoring engine
- No progress tracking
- No impact tracking
- No feedback flows
- No AI features
- No analytics
- No org model
- No permissions or authentication complexity beyond what is needed for a local MVP
- No framework versioning beyond a placeholder if helpful
- No import/export, sharing, forking, or open-source framework browsing

## UX expectations

The experience should feel like a **first visual version** of a framework builder, not a data entry form alone.

The UI should allow the user to:

1. Start a new framework
2. Enter framework name and short description
3. Add/edit role levels
4. Add/edit dimensions
5. For each dimension, define behavioural expectations across levels
6. See the framework as a coherent structure while editing
7. Save and review the final framework state

Prefer a layout that makes the relationship between:

- Framework
- Role levels
- Dimensions
- Level expectations

very easy to understand.

## Required interface behaviour

- Support adding and removing role levels
- Support adding and removing dimensions
- Support editing expectations for each dimension at each level
- Prevent an incomplete framework from being saved unless core required fields are present
- Show a clear summary or preview of the framework as it is being built

## Required visualisation

Include a **radar / spider chart style visualisation** like the attached image, where:

- Each **dimension** is plotted on its own axis
- The **levels for each dimension** are plotted as points or vertices on the chart
- The points for each level should be **connected with distinctive lines**
- The visual should clearly show the shape of the framework across dimensions
- Multiple levels should be distinguishable from one another
- The chart should update as the user edits dimensions, levels, and expectations

The purpose of the chart is to give an immediate visual sense of:

- how dimensions compare
- how progression changes by level
- what the framework shape looks like overall

## Suggested UI shape

A good MVP could use:

- A left-side list or navigation for levels and dimensions
- A central editor for the selected item
- A right-side or lower summary panel showing the overall framework structure
- A radar/spider chart panel showing the plotted framework visually

Or any other structure that makes the model easy to understand visually.

## Data model for the MVP

Use a simple local data structure with entities similar to:

- Framework
- RoleLevel
- Dimension
- DimensionLevelExpectation

Do not over-engineer the schema.

## Behavioural expectations

Each expectation should be represented in a way that allows a user to enter or view the behaviour expected at that dimension for that level.

## Deliverable

Produce a working MVP implementation that is visually coherent and editable.

If possible, make it:

- clean
- minimal
- easy to extend later
- suitable for demonstrating the framework-building concept to stakeholders

## Success criteria

The MVP is successful if a user can:

- create a new framework
- define levels and dimensions
- define expectations between them
- see the resulting framework clearly
- view the framework in a radar/spider chart with connected level lines
- save a coherent first draft




![[Pasted image 20260410141909.png]]