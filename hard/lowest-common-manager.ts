import evalFunctionPerformance from '../lib/evalFunctionPerformance';

/**
 * Lowest Common Manager
 *
 * You are given three inputs all of which are instances of an `OrgChart`
 * class that have a `directReports` property pointing to their direct
 * reports. The first input is the top manager in an organizational chart
 * (i.e., the only instance that isn't anybody else's direct report), and
 * the other two inputs are reports in the organizational chart. The two
 * reports are guaranteed to be distinct.
 *
 * Write a function that returns the lowest common manager to the two reports
 *
 * Input:
 *
 *  Node A - Top Manager
 *  Node E - Report One
 *  Node I - Report Two
 *
 *            A
 *         /     \
 *        B       C
 *      /  \     /  \
 *     D    E   F    G
 *   /  \
 *  H    I
 *
 * Output: Node B
 *
 * Depth First Search and record the path to each of the reports.
 * Find the common manager
 *
 * For report E: [A, B, E]
 * For report I: [A, B, D, I]
 *
 * Time: O(n)
 * Space: O(d)
 */
class OrgChart {
  name: string;
  directReports: OrgChart[];

  constructor(name: string) {
    this.name = name;
    this.directReports = [];
  }
}

interface OrgInfo {
  lowestCommonManager: OrgChart | null;
  numImportantReports: number;
}

function getLowestCommonManager(topManager: OrgChart, reportOne: OrgChart, reportTwo: OrgChart): OrgChart {
  return getOrgInfo(topManager, reportOne, reportTwo).lowestCommonManager!;
}

function getOrgInfo(manager: OrgChart, reportOne: OrgChart, reportTwo: OrgChart): OrgInfo {
  let numImportantReports = 0;

  for (const directReport of manager.directReports) {
    const orgInfo = getOrgInfo(directReport, reportOne, reportTwo);

    if (orgInfo.lowestCommonManager) {
      return orgInfo;
    }

    numImportantReports += orgInfo.numImportantReports;
  }

  if (manager === reportOne || manager === reportTwo) {
    numImportantReports += 1;
  }

  const lowestCommonManager = numImportantReports === 2 ? manager : null;

  return { lowestCommonManager, numImportantReports };
}

// =============================================================================
// Tests
// =============================================================================

const top = new OrgChart('A');
const B = new OrgChart('B');
const C = new OrgChart('C');
const D = new OrgChart('D');
const E = new OrgChart('E');
const F = new OrgChart('F');
const G = new OrgChart('G');
const H = new OrgChart('H');
const I = new OrgChart('I');
top.directReports = [B, C];
B.directReports = [D, E];
C.directReports = [F, G];
D.directReports = [H, I];

console.log(getLowestCommonManager(top, E, I));
evalFunctionPerformance(getLowestCommonManager, top, E, I);
