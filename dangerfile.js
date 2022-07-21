// refer file: https://gist.github.com/kkemple/998aad9f2b25520c916b00891abb6543
import { danger, fail, warn, message } from 'danger';
const fs = require('fs');
/**
 * Rule: Small pr is suggested.
 * Reason: Pr is not supposed to be very large so it is suggested to keep the pr small.
 *         So it would be easy for reviewer to review and reduce chances of missing bugs.
 *         Warn when there is a big PR
 */
const pr = danger.github.pr;
const bigPRThreshold = 600;
if (pr.additions > bigPRThreshold) {
  warn(`Your PR has over ${bigPRThreshold} lines of code additions :scream: . Try to breakup into separate PRs :+1:`);
}

/**
 * Rule: 1-2 reviewer is required.
 * Reason: No reviewer tends to leave a PR in a state where nobody is
 *         responsible. Similarly, more than 2 reviewer doesn't clearly state
 *         who is responsible for the review. 2 reviewrs can speed up review as well
 *         as suppose 1 suppose to be primary reviewer and other is secondary reviewer
 */
// Get total reviewers assigned by the user
const requestedReviewers = danger.github.requested_reviewers;
const requestedReviewersCount = requestedReviewers.users.length + requestedReviewers.teams.length;
// Get total distinct reviewers who have provided the review
const reviews = danger.github.reviews;
let reviewers = [];
for (let i = 0; i < reviews.length; i++) {
  if (reviews[i].user.type === 'User') {
    if (!reviewers.includes(reviews[i].id)) {
      reviewers.push(reviews[i].id);
    }
  }
}
const reviewersCount = reviewers.length;
// either PR should already be reviewed or reviewers must be added
if (requestedReviewersCount === 0 && reviewersCount === 0) {
  fail(`🕵 Whoops, I don't see any reviewers. Remember to add one.`);
} else if (requestedReviewersCount > 2) {
  warn(
    `It's great to have ${requestedReviewersCount} reviewers. Remember though ` +
      `that more than 2 reviewer may lead to uncertainty as to who is responsible for the review.`
  );
}

/**
 * Rule: Pr description is required.
 * Reason: No PR is too small to include a description of why you made a change
 *         2191 is size of pr template assuming that is never going to change
 */
const prTemplateSize = 2191;
if (pr.body.length <= prTemplateSize) {
  warn(`Please include a description of your PR changes.`);
}

/**
 * Rule: Labels is required.
 * Reason: No reviewer tends to leave a PR without label. A label helps
 *         to describe the purpose of pr.
 */
if (pr.labels.length < 1) {
  fail(`🕵 Whoops, I don't see any labels. Please add relevant labels to your pr.`);
}

const modifiedFiles = danger.git.modified_files;
const newFiles = danger.git.created_files;
const changedFiles = [...modifiedFiles, ...newFiles];

for (let file of changedFiles) {
  const fileContent = fs.readFileSync(file).toString();
  const fileUrl = danger.github.utils.fileLinks([file]);
  console.log('🚀 ~ fileUrl', fileUrl);

  if (fileContent.includes('!important')) warn(`**${fileUrl}**: No !important tags`);
}
