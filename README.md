# Welcome to &why's coding test

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Env Variables
Please pull the environment variables from Vercel using the following command:
```
vc env pull --environment=production --yes
```
You need to have the [Vercel CLI](https://vercel.com/docs/cli) installed globally.


## The task
You are tasked with building an interactive Cat grid.

You can find a [simple mock-up of the Cat grid in the figma file](https://www.figma.com/file/QaAUTjri39HPaSUTEoMfWQ/Cat-Grid?type=design&node-id=55%3A2&mode=dev)

Please keep in mind that the UI is not the focus of this task. Feel free to use component libraries to speed up development. We like any of the following:
* [shadcn](https://ui.shadcn.com/)
* [Headless UI](https://headlessui.com/)
* [Radix UI](https://www.radix-ui.com/)

Please use [TailwindCSS](https://tailwindcss.com/).

### Getting the data
Please query cat data from the [Cat API](https://developers.thecatapi.com)

1. Create an interactive, endless grid that showcases the various cats. A good example is [Vitra's gift finder](https://findmy.vitra.com/f/en-en/gifts). Feel free to tweak the design to your needs.
2. Please display the details of a specific breed in an overlay.
3. Implement a filter bar that allows users to filter the cat grid by breed.

**Bonus Points**: Create an animation that reshuffles the grid when a filter is selected.

### Building the UI
Please review [the Cat grid mock-up in the figma file](https://www.figma.com/file/QaAUTjri39HPaSUTEoMfWQ/Cat-Grid?type=design&node-id=0%3A1&mode=dev). Please choose an appropriate breakpoint when switching between mobile and desktop layouts.

#### Mobile
On mobile, the cat grid is  more condensed. Feel free to implement a version that fits well.

There are **no** filters on mobile

#### Tablet and above
On larger screens, the cat grid offers a filter bar next to the cat cards. Checking one of the filters should update the card grid. Clicking on a cat card triggers the overlay, displaying additional information about the selected breeed.

Please distribute cards infinitely across the screen.

## Expected outcome
Please submit a PR with your implementation of the Cat grid. We'd expect a working deployment that we can preview in Vercel.

### Next.js & React
We are using Next.js 14 and App Router, please use current Next.js and React features where appropriate.

### Typescript
Please define Typescript Types as you see fit. `any` is often not a good choice 😸

---

Thank you so much for taking the time to complete this task 🙏
If you have any question, please do not hesitate to reach out.
