import { ListIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { cn } from '@/utils'

import { TableOfContents } from '.'

export default {
  title: 'Components/Table Of Contents',
  component: TableOfContents,
  args: {
    scrollOptions: { behavior: 'smooth', block: 'start', inline: 'nearest' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A table of contents that lists the headings of a long article and highlights the section currently in view. Each `TableOfContents.Item` targets an element by `targetId` and scrolls to it on click. Items set `data-in-view="true"` while any part of their target is visible; `visibilityThreshold` (0 to 1) sets the fraction that must be visible. Use `depth` (1 to 5) to indent nested sections. The shared indicator inside `TableOfContents.List` tracks the first and last visible items.',
      },
    },
    subtitle: 'A navigation aid that tracks the visible section of an article',
  },
  subcomponents: {
    TableOfContentsItem: TableOfContents.Item,
    TableOfContentsList: TableOfContents.List,
    TableOfContentsTitle: TableOfContents.Title,
  },
  render: (args) => (
    <article className="relative flex justify-between gap-xl">
      <section
        className={cn(
          'w-full max-w-[65ch] style-text-prose-1 text-[max(1rem,var(--text-lg))] wrap-anywhere text-on-surface-variant',
          '[&_h1]:mb-md [&_h1]:style-text-strong-5 [&_h1]:text-on-surface',
          '[&_h1+p]:style-text-prose-2',
          '[&_h2]:mb-sm [&_h2]:border-b [&_h2]:border-border [&_h2]:pb-sm [&_h2]:style-text-strong-3 [&_h2]:text-on-surface [&>section:has(>h2)]:mt-2xl',
          '[&_h3]:mb-xs [&_h3]:style-text-strong-2 [&_h3]:text-on-surface [&_section:has(>h3)]:mt-lg',
          '[&_:is(h4,h5,h6)]:mb-xs [&_:is(h4,h5,h6)]:text-on-surface [&_h4]:style-text-strong-1 [&_h5]:style-text-strong-0 [&_h6]:style-text-strong--1 [&_section:has(>:is(h4,h5,h6))]:mt-md',
        )}
      >
        <header>
          <h1 id="getting-started-with-a-table-of-contents">
            Getting started with a Table of Contents
          </h1>
          <p>
            A table of contents helps readers understand how an article is organized and jump
            directly to the information they need. It is especially useful for long-form guides with
            several distinct topics.
          </p>
        </header>
        <section aria-labelledby="plan-the-structure">
          <h2 id="plan-the-structure">Plan the structure</h2>
          <p>
            Begin with a clear outline. Group related ideas under descriptive headings, and keep the
            hierarchy consistent so readers can scan the page quickly.
          </p>
          <p>
            Give each section a purpose statement in its first paragraph. Readers who skim the page
            can then decide which sections deserve a closer read.
          </p>
          <section aria-labelledby="start-with-the-main-ideas">
            <h3 id="start-with-the-main-ideas">Start with the main ideas</h3>
            <p>
              Identify the most important topics before writing. Arrange them in an order that helps
              readers move from basic concepts to more detailed information.
            </p>
            <p>
              Keep each paragraph focused on one idea. A clear sequence makes the outline feel
              logical rather than arbitrary.
            </p>
          </section>
          <section aria-labelledby="group-related-details">
            <h3 id="group-related-details">Group related details</h3>
            <p>
              Place supporting details beneath the topic they explain. A small number of focused
              subsections can make a long section easier to navigate.
            </p>
            <p>
              Limit each subsection to a single task or question so readers can finish it in one
              pass.
            </p>
          </section>
        </section>
        <section aria-labelledby="write-for-easy-scanning">
          <h2 id="write-for-easy-scanning">Write for easy scanning</h2>
          <p>
            Use concise paragraphs, meaningful section titles, and examples where they clarify an
            idea. A predictable structure makes it easier to find details and return to them later.
          </p>
          <p>
            Prefer short sentences and lists when a section describes several parallel options.
            Readers can compare them at a glance.
          </p>
          <section aria-labelledby="choose-descriptive-headings">
            <h3 id="choose-descriptive-headings">Choose descriptive headings</h3>
            <p>
              Tell readers what each section covers instead of relying on vague labels. Specific
              headings make it easier to decide which part of the article to read.
            </p>
            <p>
              Avoid generic labels like Details or More information, since they give no clue about
              the content.
            </p>
          </section>
          <section aria-labelledby="break-up-complex-explanations">
            <h3 id="break-up-complex-explanations">Break up complex explanations</h3>
            <p>
              When a topic includes several steps or considerations, give each part its own
              subsection. Short sections help readers keep their place and understand how ideas fit
              together.
            </p>
            <p>Lead with the main point in each subsection, then add the supporting context.</p>
          </section>
        </section>
        <section aria-labelledby="keep-navigation-useful">
          <h2 id="keep-navigation-useful">Keep navigation useful</h2>
          <p>
            Include the sections readers are most likely to need, and make each entry easy to
            recognize. As the article changes, review its navigation so it stays accurate and
            helpful.
          </p>
          <p>
            Remove entries for sections that no longer exist, and add entries for new ones the same
            day the content changes.
          </p>
          <section aria-labelledby="review-the-hierarchy">
            <h3 id="review-the-hierarchy">Review the hierarchy</h3>
            <p>
              Make sure subsection headings belong under the right main topic, and avoid skipping
              heading levels. A consistent hierarchy benefits both readers and assistive technology.
            </p>
          </section>
          <section aria-labelledby="update-as-content-evolves">
            <h3 id="update-as-content-evolves">Update as content evolves</h3>
            <p>
              Revisit the outline whenever you add, remove, or reorganize material. Keeping headings
              and navigation in sync prevents readers from following outdated paths.
            </p>
            <p>
              Check the navigation after each major edit, and test it with a keyboard so every entry
              is reachable.
            </p>
          </section>
        </section>
        <section aria-labelledby="make-the-article-accessible">
          <h2 id="make-the-article-accessible">Make the article accessible</h2>
          <p>
            A well-organized article should work for people using different devices and ways of
            navigating. Use semantic headings and clear language throughout.
          </p>
          <p>
            Provide descriptive alt text for images, keep color contrast high, and avoid relying on
            color alone to convey meaning.
          </p>
          <section aria-labelledby="use-headings-in-order">
            <h3 id="use-headings-in-order">Use headings in order</h3>
            <p>
              Nest headings according to their relationship rather than choosing a level for its
              visual appearance. This creates a meaningful outline that can be explored efficiently.
            </p>
            <section aria-labelledby="nest-subsections">
              <h4 id="nest-subsections">Nest subsections</h4>
              <p>
                A subsection belongs one level below the heading it supports. Moving down a single
                level at a time keeps the relationship between topics clear.
              </p>
              <section aria-labelledby="go-deeper-only-when-needed">
                <h5 id="go-deeper-only-when-needed">Go deeper only when needed</h5>
                <p>
                  Additional levels are useful for reference material with detailed breakdowns, but
                  most articles read best with two or three levels.
                </p>
                <section aria-labelledby="keep-deep-levels-rare">
                  <h6 id="keep-deep-levels-rare">Keep deep levels rare</h6>
                  <p>
                    If a section regularly needs a sixth heading level, consider splitting it into a
                    separate article instead.
                  </p>
                </section>
              </section>
            </section>
          </section>
          <section aria-labelledby="write-clear-link-labels">
            <h3 id="write-clear-link-labels">Write clear link labels</h3>
            <p>
              When linking to related resources, describe the destination so readers know what to
              expect. Clear labels make navigation more useful in context.
            </p>
            <p>
              Avoid vague phrases such as click here, since they tell readers nothing about the
              destination.
            </p>
          </section>
        </section>
      </section>
      <TableOfContents {...args} className={cn('sticky top-md self-start', args.className)}>
        <TableOfContents.Title>
          <ListIcon weight="bold" />
          Table of Contents
        </TableOfContents.Title>
        <TableOfContents.List>
          <TableOfContents.Item depth={1} targetId="plan-the-structure">
            Plan the structure
          </TableOfContents.Item>
          <TableOfContents.Item depth={2} targetId="start-with-the-main-ideas">
            Start with the main ideas
          </TableOfContents.Item>
          <TableOfContents.Item depth={2} targetId="group-related-details">
            Group related details
          </TableOfContents.Item>
          <TableOfContents.Item depth={1} targetId="write-for-easy-scanning">
            Write for easy scanning
          </TableOfContents.Item>
          <TableOfContents.Item depth={2} targetId="choose-descriptive-headings">
            Choose descriptive headings
          </TableOfContents.Item>
          <TableOfContents.Item depth={2} targetId="break-up-complex-explanations">
            Break up complex explanations
          </TableOfContents.Item>
          <TableOfContents.Item depth={1} targetId="keep-navigation-useful">
            Keep navigation useful
          </TableOfContents.Item>
          <TableOfContents.Item depth={2} targetId="review-the-hierarchy">
            Review the hierarchy
          </TableOfContents.Item>
          <TableOfContents.Item depth={2} targetId="update-as-content-evolves">
            Update as content evolves
          </TableOfContents.Item>
          <TableOfContents.Item depth={1} targetId="make-the-article-accessible">
            Make the article accessible
          </TableOfContents.Item>
          <TableOfContents.Item depth={2} targetId="use-headings-in-order">
            Use headings in order
          </TableOfContents.Item>
          <TableOfContents.Item depth={3} targetId="nest-subsections">
            Nest subsections
          </TableOfContents.Item>
          <TableOfContents.Item depth={4} targetId="go-deeper-only-when-needed">
            Go deeper only when needed
          </TableOfContents.Item>
          <TableOfContents.Item depth={5} targetId="keep-deep-levels-rare">
            Keep deep levels rare
          </TableOfContents.Item>
          <TableOfContents.Item depth={2} targetId="write-clear-link-labels">
            Write clear link labels
          </TableOfContents.Item>
        </TableOfContents.List>
      </TableOfContents>
    </article>
  ),
} as Meta<typeof TableOfContents>

type Story = StoryObj<typeof TableOfContents>

export const Playground: Story = {
  // Smooth scrolling is interrupted in the test browser; the other stories keep it.
  args: { scrollOptions: { behavior: 'instant', block: 'start', inline: 'nearest' } },
  play: async ({ canvas, userEvent }) => {
    const title = canvas.getByRole('heading', { level: 1 }),
      heading = canvas.getByRole('heading', { level: 2, name: 'Plan the structure' }),
      subheading = canvas.getByRole('heading', { level: 3, name: 'Start with the main ideas' }),
      body = canvas.getByText(/Begin with a clear outline/),
      targets = canvas.getAllByRole('heading').filter((element) => element.tagName !== 'H1'),
      targetIds = targets.map((element) => element.id)
    await expect(targets.every((element) => element.id.length > 0)).toBe(true)
    await expect(targetIds.every((id) => id.length > 0)).toBe(true)
    await expect(new Set(targetIds).size).toBe(targetIds.length)
    for (const mainHeading of canvas.getAllByRole('heading', { level: 2 })) {
      await expect(mainHeading.parentElement!.querySelectorAll('h3')).toHaveLength(2)
    }
    await waitFor(() => {
      const titleStyle = getComputedStyle(title),
        headingStyle = getComputedStyle(heading),
        subheadingStyle = getComputedStyle(subheading),
        bodyStyle = getComputedStyle(body)
      expect(parseFloat(titleStyle.fontSize)).toBeGreaterThan(parseFloat(headingStyle.fontSize))
      expect(parseFloat(headingStyle.fontSize)).toBeGreaterThan(
        parseFloat(subheadingStyle.fontSize),
      )
      expect(parseFloat(subheadingStyle.fontSize)).toBeGreaterThan(parseFloat(bodyStyle.fontSize))
      expect(parseFloat(getComputedStyle(heading.parentElement!).marginTop)).toBeGreaterThan(
        parseFloat(getComputedStyle(subheading.parentElement!).marginTop),
      )
      expect(parseFloat(bodyStyle.fontSize)).toBeGreaterThanOrEqual(
        parseFloat(getComputedStyle(document.documentElement).fontSize),
      )
      expect(parseFloat(bodyStyle.lineHeight) / parseFloat(bodyStyle.fontSize)).toBeGreaterThan(1.5)
    })
    const item = canvas.getByRole('button', { name: 'Plan the structure' }),
      view = heading.ownerDocument.defaultView
    await expect(item.getBoundingClientRect().height).toBeGreaterThan(0)
    view?.scrollTo({ top: 0, behavior: 'instant' })
    try {
      await waitFor(() => expect(item).toHaveAttribute('data-in-view', 'true'))
      await userEvent.click(item)
      await waitFor(() => {
        expect(view?.scrollY).toBeGreaterThan(0)
        expect(Math.abs(heading.getBoundingClientRect().top)).toBeLessThanOrEqual(1)
      })
      heading.scrollIntoView({ behavior: 'instant', block: 'start' })
      view?.scrollBy({ top: heading.getBoundingClientRect().height + 1, behavior: 'instant' })
      await expect(heading.getBoundingClientRect().bottom).toBeLessThan(0)
      await waitFor(() => expect(item).toHaveAttribute('data-in-view', 'false'))
      heading.scrollIntoView({ behavior: 'instant', block: 'start' })
      await waitFor(() => expect(item).toHaveAttribute('data-in-view', 'true'))
    } finally {
      view?.scrollTo({ top: 0, behavior: 'instant' })
    }
  },
}

export const Simple: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A flat table of contents with one level of items and no title icon.',
      },
    },
  },
  render: (args) => (
    <article className="relative flex justify-between gap-xl">
      <div className="max-w-[65ch] min-w-0 flex-1">
        <section aria-labelledby="simple-overview">
          <h2 id="simple-overview" className="style-text-strong-2 text-on-surface">
            Overview
          </h2>
          <p className="style-text-prose-0 text-on-surface-variant">
            A short introduction gives readers a clear starting point before they move into the
            details.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            Summarize the purpose in a sentence or two, then outline what readers will learn.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            This guide walks through the first steps of a new workspace, from understanding the
            available tools to deciding what to do next. It is written for people who are joining
            for the first time and may not know the team's usual vocabulary.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            You do not need to complete every optional task before moving on. Start with the
            essentials, then return to the reference material when a project calls for it.
          </p>
        </section>
        <section aria-labelledby="simple-setup" className="mt-xl">
          <h2 id="simple-setup" className="style-text-strong-2 text-on-surface">
            Setup
          </h2>
          <p className="style-text-prose-0 text-on-surface-variant">
            Keep the initial steps focused and easy to scan so readers can get started quickly.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            List each step in order and keep it to one action. Mention any tools or accounts needed
            before the first step.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            Begin by confirming that you can sign in to the team's shared workspace. If access is
            missing, contact the workspace owner before trying to configure local tools.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            Next, install the current supported version of the required tools and open the starter
            project. Use the versions listed by the team so that your local setup matches the
            environment used for reviews and automated checks.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            Run the included verification command before making changes. A successful first run
            confirms that dependencies are available and gives you a known-good baseline for later
            troubleshooting.
          </p>
        </section>
        <section aria-labelledby="simple-next-steps" className="mt-xl">
          <h2 id="simple-next-steps" className="style-text-strong-2 text-on-surface">
            Next steps
          </h2>
          <p className="style-text-prose-0 text-on-surface-variant">
            Point readers toward the next useful action once the essential setup is complete.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            Link to related guides or resources that help readers continue after the setup.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            Choose a small first task that touches the part of the project you want to understand.
            Reading a focused change from start to finish is often more useful than trying to learn
            every directory at once.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            Before sharing your work, review the project checklist and include a concise description
            of what changed. Mention any checks you ran and call out questions that still need a
            decision.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            Keep the setup notes nearby as the workspace evolves. Small updates to these steps can
            save the next person from repeating the same investigation.
          </p>
        </section>
        <section aria-labelledby="simple-first-task" className="mt-xl">
          <h2 id="simple-first-task" className="style-text-strong-2 text-on-surface">
            Choose a first task
          </h2>
          <p className="style-text-prose-0 text-on-surface-variant">
            Start with a task that has a clear outcome and a small number of moving parts. A focused
            change gives you a chance to learn the review process without needing to understand the
            entire product first.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            Ask a teammate to point you toward an area that needs attention. Confirm what success
            looks like before you begin, then share an early draft if you encounter uncertainty.
          </p>
        </section>
        <section aria-labelledby="simple-get-help" className="mt-xl">
          <h2 id="simple-get-help" className="style-text-strong-2 text-on-surface">
            Get help
          </h2>
          <p className="style-text-prose-0 text-on-surface-variant">
            When something does not work, note the command you ran, what you expected, and the
            result you saw. A concise report helps teammates reproduce the problem and suggest a
            useful next step.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            Search the team's shared notes before repeating a setup step. If the answer is not
            there, add what you learned after resolving the issue so the guide becomes more useful
            for the next person.
          </p>
        </section>
        <section aria-labelledby="simple-keep-learning" className="mt-xl">
          <h2 id="simple-keep-learning" className="style-text-strong-2 text-on-surface">
            Keep learning
          </h2>
          <p className="style-text-prose-0 text-on-surface-variant">
            Use the project documentation as a map, not a checklist to memorize. Follow links when
            they become relevant to your work, and keep a short list of questions to revisit.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            As you gain context, look for opportunities to improve unclear instructions or remove
            outdated steps. Small contributions make onboarding easier for the next teammate.
          </p>
        </section>
      </div>
      <TableOfContents {...args} className={cn('sticky top-md self-start', args.className)}>
        <TableOfContents.Title>On this page</TableOfContents.Title>
        <TableOfContents.List>
          <TableOfContents.Item depth={1} targetId="simple-overview">
            Overview
          </TableOfContents.Item>
          <TableOfContents.Item depth={1} targetId="simple-setup">
            Setup
          </TableOfContents.Item>
          <TableOfContents.Item depth={1} targetId="simple-next-steps">
            Next steps
          </TableOfContents.Item>
          <TableOfContents.Item depth={1} targetId="simple-first-task">
            Choose a first task
          </TableOfContents.Item>
          <TableOfContents.Item depth={1} targetId="simple-get-help">
            Get help
          </TableOfContents.Item>
          <TableOfContents.Item depth={1} targetId="simple-keep-learning">
            Keep learning
          </TableOfContents.Item>
        </TableOfContents.List>
      </TableOfContents>
    </article>
  ),
}

export const Nested: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Two levels of items, with a title icon. Child items use `depth={2}`.',
      },
    },
  },
  render: (args) => (
    <article className="relative flex justify-between gap-xl">
      <div className="max-w-[65ch] min-w-0 flex-1">
        <section aria-labelledby="nested-plan">
          <h2 id="nested-plan" className="style-text-strong-2 text-on-surface">
            Plan the work
          </h2>
          <p className="style-text-prose-0 text-on-surface-variant">
            A clear plan helps teams understand both the goal and the route to get there.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            Write down the goal, the constraints, and the people who need to approve the plan.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            A useful plan answers three questions: what outcome are we aiming for, why does it
            matter now, and how will we know the work is complete? Keep the answers visible so that
            later decisions can be checked against the original intent.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            Gather the information the team already has before estimating effort. Existing research,
            customer feedback, and technical constraints can reveal dependencies that are easy to
            miss in an early conversation.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            Record assumptions separately from confirmed facts. When an assumption changes, the team
            can revisit the affected decisions instead of discovering the change at the end.
          </p>
          <section aria-labelledby="nested-scope" className="mt-lg">
            <h3 id="nested-scope" className="style-text-strong-1 text-on-surface">
              Define the scope
            </h3>
            <p className="style-text-prose-0 text-on-surface-variant">
              Agree on what is included before splitting the work into smaller tasks.
            </p>
            <p className="style-text-prose-0 text-on-surface-variant">
              Note what is out of scope as well, so that later requests are easier to evaluate.
            </p>
            <p className="style-text-prose-0 text-on-surface-variant">
              Describe the boundaries in terms people can test. For example, specify which user
              roles, platforms, or workflows are included rather than using broad phrases such as
              "the main experience."
            </p>
            <p className="style-text-prose-0 text-on-surface-variant">
              Identify decisions that depend on the scope, including integrations and data that the
              work is allowed to change. These details help reviewers spot an unintended expansion
              before implementation begins.
            </p>
          </section>
          <section aria-labelledby="nested-dependencies" className="mt-lg">
            <h3 id="nested-dependencies" className="style-text-strong-1 text-on-surface">
              Map dependencies
            </h3>
            <p className="style-text-prose-0 text-on-surface-variant">
              Identify work that must happen first, decisions that need input from another team, and
              services that could affect delivery. Making dependencies visible gives the team time
              to resolve them before they block progress.
            </p>
            <p className="style-text-prose-0 text-on-surface-variant">
              For each dependency, record who can help and when an answer is needed. Revisit the
              list during planning reviews as new information becomes available.
            </p>
          </section>
          <section aria-labelledby="nested-milestones" className="mt-lg">
            <h3 id="nested-milestones" className="style-text-strong-1 text-on-surface">
              Set milestones
            </h3>
            <p className="style-text-prose-0 text-on-surface-variant">
              Break the plan into checkpoints that make progress visible.
            </p>
            <p className="style-text-prose-0 text-on-surface-variant">
              Each checkpoint should have a clear outcome that the team can confirm.
            </p>
            <p className="style-text-prose-0 text-on-surface-variant">
              Order milestones around useful results rather than a list of activities. A working
              prototype, a reviewed design, or a tested migration gives stakeholders something
              concrete to evaluate.
            </p>
            <p className="style-text-prose-0 text-on-surface-variant">
              Add an owner and an expected review point to each checkpoint. The dates can change as
              the team learns, but ownership makes the next action clear.
            </p>
          </section>
        </section>
        <section aria-labelledby="nested-review" className="mt-xl">
          <h2 id="nested-review" className="style-text-strong-2 text-on-surface">
            Review progress
          </h2>
          <p className="style-text-prose-0 text-on-surface-variant">
            Regular reviews help teams adjust when priorities or assumptions change.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            Keep reviews short and focused on decisions, so the team can act on them quickly.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            Compare recent results with the intended outcome, and explain any meaningful difference.
            A missed estimate may point to a hidden dependency, while an early result may create
            room to address a follow-up need.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            End each review with a short list of decisions, owners, and next check-in dates. Share
            that record with people who could not attend so the whole team works from the same
            understanding.
          </p>
          <p className="style-text-prose-0 text-on-surface-variant">
            If priorities shift, update the plan and explain what changed. A visible adjustment is
            easier to coordinate than an outdated plan that quietly stops reflecting the work.
          </p>
          <section aria-labelledby="nested-share-decisions" className="mt-lg">
            <h3 id="nested-share-decisions" className="style-text-strong-1 text-on-surface">
              Share decisions
            </h3>
            <p className="style-text-prose-0 text-on-surface-variant">
              Record important decisions with their context, owner, and date. This gives people who
              join later a way to understand why the team chose a particular direction.
            </p>
            <p className="style-text-prose-0 text-on-surface-variant">
              When a decision is revisited, link the new conclusion to the earlier one. Keeping the
              history together helps prevent the same questions from being reopened without new
              information.
            </p>
          </section>
          <section aria-labelledby="nested-follow-through" className="mt-lg">
            <h3 id="nested-follow-through" className="style-text-strong-1 text-on-surface">
              Follow through
            </h3>
            <p className="style-text-prose-0 text-on-surface-variant">
              Turn review outcomes into specific actions with an owner and a check-in point. Keep
              the list small enough that the team can see what matters most before the next review.
            </p>
            <p className="style-text-prose-0 text-on-surface-variant">
              At the next check-in, close completed actions or explain what is preventing progress.
              That simple habit keeps the review process connected to the work itself.
            </p>
          </section>
        </section>
      </div>
      <TableOfContents {...args} className={cn('sticky top-md self-start', args.className)}>
        <TableOfContents.Title>
          <ListIcon weight="bold" />
          On this page
        </TableOfContents.Title>
        <TableOfContents.List>
          <TableOfContents.Item depth={1} targetId="nested-plan">
            Plan the work
          </TableOfContents.Item>
          <TableOfContents.Item depth={2} targetId="nested-scope">
            Define the scope
          </TableOfContents.Item>
          <TableOfContents.Item depth={2} targetId="nested-dependencies">
            Map dependencies
          </TableOfContents.Item>
          <TableOfContents.Item depth={2} targetId="nested-milestones">
            Set milestones
          </TableOfContents.Item>
          <TableOfContents.Item depth={1} targetId="nested-review">
            Review progress
          </TableOfContents.Item>
          <TableOfContents.Item depth={2} targetId="nested-share-decisions">
            Share decisions
          </TableOfContents.Item>
          <TableOfContents.Item depth={2} targetId="nested-follow-through">
            Follow through
          </TableOfContents.Item>
        </TableOfContents.List>
      </TableOfContents>
    </article>
  ),
}
