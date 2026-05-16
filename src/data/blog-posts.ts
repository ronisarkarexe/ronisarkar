export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "code"; lang: string; code: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string }
  | { type: "divider" };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  color: string;
  comingSoon: boolean;
  content: Block[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "remittance-nestjs-blockchain",
    title: "Building Cross-Border Remittance with NestJS & Blockchain",
    excerpt:
      "How we architected a production-grade remittance platform using NestJS, BullMQ for async jobs, and ERC-20 smart contracts on Ethereum & Polygon — lessons learned.",
    date: "May 2026",
    readTime: "8 min read",
    tags: ["NestJS", "Blockchain", "Web3", "BullMQ"],
    color: "cyan",
    comingSoon: false,
    content: [
      {
        type: "p",
        text: "When our team at Nagorik Technologies set out to build Remit & Go — a cross-border finance and remittance platform — we knew the architecture had to be bulletproof. Money movement across borders, multiple currencies, and blockchain-backed wallets all in one system. Here's what we built and what we learned.",
      },
      { type: "h2", text: "The Architecture at a Glance" },
      {
        type: "p",
        text: "The backend is a NestJS monorepo with clearly separated modules: payments, wallets, notifications, and blockchain. PostgreSQL handles the main transactional data, Redis powers caching and job queues, and BullMQ manages all async operations — webhook processing, wallet reconciliation, and email dispatch.",
      },
      {
        type: "callout",
        text: "Key principle: Every financial transaction goes through a queue. Never process payments synchronously in the request cycle.",
      },
      { type: "h2", text: "Payment Gateway Integration" },
      {
        type: "p",
        text: "We integrated three payment gateways — Stripe, Fin.com, and Transfi — each with different APIs, webhook schemas, and failure behaviors. The trick was building a unified PaymentService interface so the rest of the app never knew which gateway it was talking to.",
      },
      {
        type: "code",
        lang: "typescript",
        code: `interface PaymentProvider {
  createIntent(amount: number, currency: string, metadata: Record<string, string>): Promise<PaymentIntent>;
  refund(intentId: string, amount?: number): Promise<Refund>;
  handleWebhook(payload: Buffer, signature: string): Promise<WebhookEvent>;
}

@Injectable()
export class StripeProvider implements PaymentProvider {
  constructor(private readonly stripe: Stripe) {}

  async createIntent(amount: number, currency: string, metadata: Record<string, string>) {
    return this.stripe.paymentIntents.create({ amount, currency, metadata });
  }
}`,
      },
      { type: "h2", text: "Async Job Processing with BullMQ" },
      {
        type: "p",
        text: "Payment webhooks are the trickiest part. Stripe fires a webhook, your server must respond within 5 seconds, but processing a payment event can involve 10+ database writes and external API calls. The solution: accept the webhook, validate the signature, enqueue the event, return 200. Process everything in a BullMQ worker.",
      },
      {
        type: "code",
        lang: "typescript",
        code: `@Processor('payment-events')
export class PaymentEventProcessor extends WorkerHost {
  async process(job: Job<PaymentWebhookEvent>): Promise<void> {
    const { type, data } = job.data;

    switch (type) {
      case 'payment_intent.succeeded':
        await this.handleSuccess(data);
        break;
      case 'payment_intent.payment_failed':
        await this.handleFailure(data);
        break;
    }
  }

  private async handleSuccess(data: PaymentIntent) {
    // 1. Update transaction status
    // 2. Credit receiver wallet
    // 3. Emit WebSocket notification
    // 4. Send email receipt
  }
}`,
      },
      { type: "h2", text: "Blockchain: ERC-20 Wallets on Ethereum & Polygon" },
      {
        type: "p",
        text: "Each user gets a non-custodial wallet. We deploy a minimal ERC-20 contract on Polygon (for low gas fees) and Ethereum mainnet for larger transfers. Web3.js handles contract calls from NestJS.",
      },
      {
        type: "ul",
        items: [
          "Polygon for everyday remittance (fast, cheap gas ~$0.001)",
          "Ethereum mainnet for high-value transfers above a threshold",
          "Private keys stored encrypted in AWS KMS — never in plaintext",
          "Event listeners watch for Transfer events to reconcile wallet balances",
        ],
      },
      { type: "h2", text: "Real-time Notifications via WebSocket" },
      {
        type: "p",
        text: "When a transaction completes (whether from a payment gateway or a blockchain event), the user sees it instantly. NestJS Gateways with Socket.io push events to authenticated WebSocket connections. Each connection is tied to a userId room, so targeted push is straightforward.",
      },
      { type: "h2", text: "Lessons Learned" },
      {
        type: "ul",
        items: [
          "Always idempotent webhook processing — Stripe can fire the same webhook multiple times",
          "Use database-level locks or optimistic concurrency for wallet balance updates to prevent race conditions",
          "Test blockchain interactions against a local Hardhat node before hitting testnet",
          "BullMQ retry strategies are critical — use exponential backoff with a dead letter queue",
          "Log everything with correlation IDs — tracing a payment across 5 services is hard without them",
        ],
      },
      {
        type: "callout",
        text: "The most valuable decision: treating every external side-effect (payment, blockchain write, email) as an async job. Our system can go down and come back up — no transaction is lost.",
      },
    ],
  },
  {
    slug: "redis-bullmq-nestjs",
    title: "Redis + BullMQ: Fault-Tolerant Job Queues in NestJS",
    excerpt:
      "A deep-dive into designing background job systems that handle payment webhooks, wallet updates, and email notifications at scale without data loss.",
    date: "Apr 2026",
    readTime: "6 min read",
    tags: ["Redis", "BullMQ", "NestJS", "Backend"],
    color: "violet",
    comingSoon: false,
    content: [
      {
        type: "p",
        text: "Background job processing is the backbone of any serious backend. If you're using NestJS, BullMQ (with Redis as the broker) is the best option available. Here's a practical guide to setting it up properly — not just the happy path, but the failure cases too.",
      },
      { type: "h2", text: "Why BullMQ over Other Solutions?" },
      {
        type: "ul",
        items: [
          "Built on Redis — persistent, fast, battle-tested",
          "First-class TypeScript support",
          "Delayed jobs, priority queues, rate limiting out of the box",
          "Job events and progress tracking",
          "Works seamlessly with NestJS DI system",
        ],
      },
      { type: "h2", text: "Setup with @nestjs/bullmq" },
      {
        type: "code",
        lang: "typescript",
        code: `// app.module.ts
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    BullModule.registerQueue({
      name: 'payment-events',
      defaultJobOptions: {
        attempts: 5,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: 100,
        removeOnFail: 500,
      },
    }),
  ],
})
export class AppModule {}`,
      },
      { type: "h2", text: "Structuring Your Queue Service" },
      {
        type: "p",
        text: "Separate your producer (the service that enqueues jobs) from your consumer (the worker that processes them). This keeps your main request cycle clean.",
      },
      {
        type: "code",
        lang: "typescript",
        code: `// payment-queue.service.ts  — Producer
@Injectable()
export class PaymentQueueService {
  constructor(
    @InjectQueue('payment-events')
    private readonly paymentQueue: Queue,
  ) {}

  async enqueueWebhookEvent(event: PaymentWebhookEvent): Promise<Job> {
    return this.paymentQueue.add('webhook', event, {
      jobId: event.id, // Idempotency key — prevents duplicate processing
      priority: event.type === 'payment_intent.succeeded' ? 1 : 10,
    });
  }

  async scheduleReconciliation(userId: string): Promise<Job> {
    return this.paymentQueue.add('reconcile', { userId }, {
      delay: 5 * 60 * 1000, // 5 minutes
    });
  }
}`,
      },
      { type: "h2", text: "The Worker: Handling Failures Gracefully" },
      {
        type: "p",
        text: "The worker is where most bugs hide. Always handle partial failures — if step 3 of 5 fails, the job should retry from the beginning safely. That means idempotent operations.",
      },
      {
        type: "code",
        lang: "typescript",
        code: `@Processor('payment-events')
export class PaymentEventProcessor extends WorkerHost {
  private readonly logger = new Logger(PaymentEventProcessor.name);

  async process(job: Job): Promise<void> {
    this.logger.log(\`Processing job \${job.id} (attempt \${job.attemptsMade + 1})\`);

    try {
      if (job.name === 'webhook') {
        await this.processWebhook(job.data);
      }
    } catch (error) {
      this.logger.error(\`Job \${job.id} failed: \${error.message}\`);
      throw error; // BullMQ handles retry based on attempts config
    }
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    if (job.attemptsMade >= job.opts.attempts) {
      // Send to dead letter queue or alert on-call
      this.alertService.critical(\`Job \${job.id} exhausted retries\`, error);
    }
  }
}`,
      },
      { type: "h2", text: "Monitoring with Bull Board" },
      {
        type: "p",
        text: "Install @bull-board/nestjs for a visual dashboard to monitor queues, retry failed jobs, and inspect job data. Essential for production debugging.",
      },
      {
        type: "callout",
        text: "Production tip: Set removeOnComplete: 100 and removeOnFail: 500 to prevent Redis memory bloat. Keep enough failed jobs for debugging, but not forever.",
      },
      { type: "h2", text: "Patterns for Common Use Cases" },
      {
        type: "ul",
        items: [
          "Webhook processing: Use job ID as the webhook event ID for idempotency",
          "Email sending: Low priority queue, high retry count, exponential backoff",
          "Report generation: Use job progress updates to show status to the client",
          "Scheduled reconciliation: Delayed jobs + cron jobs combined",
          "Rate limiting: BullMQ's built-in rate limiter for third-party API calls",
        ],
      },
    ],
  },
  {
    slug: "erc20-production",
    title: "ERC-20 Smart Contracts: From Development to Production",
    excerpt:
      "A practical walkthrough of deploying ERC-20 tokens on Ethereum and Polygon — gas optimization, testing with Hardhat, and integrating Web3 wallet connectivity.",
    date: "Mar 2026",
    readTime: "7 min read",
    tags: ["Solidity", "Ethereum", "Web3", "Smart Contracts"],
    color: "orange",
    comingSoon: false,
    content: [
      {
        type: "p",
        text: "Deploying your first ERC-20 contract to a testnet is easy. Getting it production-ready on Ethereum mainnet and Polygon with a Node.js backend integration is another story. Here's everything I learned building this for Remit & Go.",
      },
      { type: "h2", text: "The ERC-20 Standard" },
      {
        type: "p",
        text: "ERC-20 is a fungible token standard on Ethereum. Every DeFi protocol, exchange, and wallet understands it. You implement 6 core functions: totalSupply, balanceOf, transfer, transferFrom, approve, and allowance.",
      },
      {
        type: "code",
        lang: "solidity",
        code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract RemitToken is ERC20, ERC20Burnable, Ownable {
    uint256 public constant MAX_SUPPLY = 100_000_000 * 10**18; // 100M tokens

    constructor(address initialOwner)
        ERC20("RemitToken", "RMT")
        Ownable(initialOwner)
    {}

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }
}`,
      },
      {
        type: "callout",
        text: "Always use OpenZeppelin contracts as a base. They're audited, well-tested, and widely trusted. Never write token logic from scratch.",
      },
      { type: "h2", text: "Testing with Hardhat" },
      {
        type: "p",
        text: "Write exhaustive tests before touching mainnet. Hardhat gives you a local EVM environment, time manipulation, and gas reporting.",
      },
      {
        type: "code",
        lang: "typescript",
        code: `import { expect } from "chai";
import { ethers } from "hardhat";

describe("RemitToken", () => {
  it("Should mint tokens to owner", async () => {
    const [owner, user] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("RemitToken");
    const token = await Token.deploy(owner.address);

    await token.mint(user.address, ethers.parseEther("1000"));
    expect(await token.balanceOf(user.address)).to.equal(
      ethers.parseEther("1000")
    );
  });

  it("Should not exceed max supply", async () => {
    // ...
    await expect(
      token.mint(user.address, ethers.parseEther("100000001"))
    ).to.be.revertedWith("Exceeds max supply");
  });
});`,
      },
      { type: "h2", text: "Deploying to Polygon for Low Gas Fees" },
      {
        type: "p",
        text: "Polygon is EVM-compatible, so your Solidity code runs unchanged. The gas fees are ~1000x cheaper than Ethereum mainnet — ideal for high-frequency remittance transfers.",
      },
      {
        type: "ul",
        items: [
          "Polygon Mumbai testnet → Polygon mainnet for the deploy flow",
          "Bridge MATIC to your deployer wallet",
          "Use the same contract ABI on both chains — same Solidity, different RPC",
          "Hardhat network config handles multi-chain deploys cleanly",
        ],
      },
      {
        type: "code",
        lang: "typescript",
        code: `// hardhat.config.ts
networks: {
  polygon: {
    url: \`https://polygon-mainnet.g.alchemy.com/v2/\${ALCHEMY_KEY}\`,
    accounts: [DEPLOYER_PRIVATE_KEY],
    gasPrice: 30_000_000_000, // 30 gwei
  },
  ethereum: {
    url: \`https://eth-mainnet.g.alchemy.com/v2/\${ALCHEMY_KEY}\`,
    accounts: [DEPLOYER_PRIVATE_KEY],
  },
},`,
      },
      { type: "h2", text: "Integrating with NestJS via Web3.js" },
      {
        type: "p",
        text: "From the NestJS backend, we interact with deployed contracts using Web3.js. The key pattern: load the contract ABI + deployed address, then call methods.",
      },
      {
        type: "code",
        lang: "typescript",
        code: `@Injectable()
export class BlockchainService {
  private readonly web3: Web3;
  private readonly contract: Contract;

  constructor() {
    this.web3 = new Web3(process.env.POLYGON_RPC_URL);
    this.contract = new this.web3.eth.Contract(
      RemitTokenABI,
      process.env.CONTRACT_ADDRESS,
    );
  }

  async getBalance(walletAddress: string): Promise<string> {
    const balance = await this.contract.methods
      .balanceOf(walletAddress)
      .call();
    return this.web3.utils.fromWei(balance as string, 'ether');
  }

  async transfer(from: string, to: string, amount: string): Promise<string> {
    const amountWei = this.web3.utils.toWei(amount, 'ether');
    const tx = await this.contract.methods.transfer(to, amountWei).send({
      from,
      gas: 100000,
    });
    return tx.transactionHash as string;
  }
}`,
      },
      { type: "h2", text: "Security Checklist Before Mainnet" },
      {
        type: "ul",
        items: [
          "Audit with Slither (free static analysis) before any external audit",
          "Re-entrancy guards on any function that sends ETH",
          "Access control: use Ownable or AccessControl, not hardcoded addresses",
          "Integer overflow: Solidity 0.8+ has built-in overflow protection",
          "Test on testnet for at least 2 weeks with real user flows",
          "Verify contract source on Etherscan/Polygonscan for transparency",
          "Never store private keys in code or environment variables — use AWS KMS or HashiCorp Vault",
        ],
      },
    ],
  },
  {
    slug: "lessons-from-bug-fixing",
    title: "From 350+ Bugs Fixed: Lessons in Code Quality & Testing",
    excerpt:
      "Reflections on triaging hundreds of production bugs over two years — what patterns emerge, how to write defensive code, and building E2E test coverage that actually works.",
    date: "Feb 2026",
    readTime: "5 min read",
    tags: ["Testing", "Code Quality", "Engineering"],
    color: "emerald",
    comingSoon: true,
    content: [],
  },
  {
    slug: "ai-assisted-development",
    title: "AI-Assisted Development: Using Cursor & Claude in Production",
    excerpt:
      "How I integrate AI tools into my daily engineering workflow — prompt engineering patterns, what works, what doesn't, and where AI still falls short.",
    date: "Coming Soon",
    readTime: "~6 min read",
    tags: ["AI", "OpenAI", "Cursor", "Developer Tools"],
    color: "pink",
    comingSoon: true,
    content: [],
  },
  {
    slug: "open-source-journey",
    title: "Hacktoberfest to Production: My Open Source Journey",
    excerpt:
      "How contributing 30+ PRs across 20+ projects shaped my engineering skills and led to building First-Issue — a platform to help others start their OSS journey.",
    date: "Coming Soon",
    readTime: "~5 min read",
    tags: ["Open Source", "Hacktoberfest", "Community"],
    color: "blue",
    comingSoon: true,
    content: [],
  },
  {
    slug: "how-to-participate-in-open-source-for-beginners",
    title: "How to Participate in Open Source — A Beginner's Complete Guide",
    excerpt:
      "Never contributed to open source before? This step-by-step guide takes you from zero to your first merged PR — finding projects, reading code, writing good issues, and more.",
    date: "May 2026",
    readTime: "7 min read",
    tags: ["Open Source", "Beginner", "Git", "GitHub"],
    color: "emerald",
    comingSoon: false,
    content: [
      {
        type: "p",
        text: "Open source can feel intimidating when you're starting out. You look at a big codebase and think: 'I'm not good enough for this.' I felt the same way. After 30+ merged PRs across 20+ projects and building my own OSS platform (Story Spark AI — now a GSSoC 2026 project), I want to give you the exact guide I wish I had.",
      },
      { type: "h2", text: "Why Contribute to Open Source?" },
      {
        type: "ul",
        items: [
          "Real-world code review from experienced engineers — better than any tutorial",
          "Your GitHub profile becomes a living portfolio that hiring managers actually check",
          "You learn how production codebases are structured, tested, and deployed",
          "Build your network — maintainers remember good contributors",
          "It feels genuinely good to ship something millions of people use",
        ],
      },
      {
        type: "callout",
        text: "You don't need to be an expert. Most merged PRs from beginners are documentation fixes, typo corrections, small bug fixes, and adding tests. These are genuinely valuable and perfect first contributions.",
      },
      { type: "h2", text: "Step 1: Set Up Your Git Basics" },
      {
        type: "p",
        text: "Before anything else, you need to be comfortable with the basic Git workflow. You don't need to know advanced Git — just these core commands:",
      },
      {
        type: "code",
        lang: "bash",
        code: `# Fork the repo on GitHub, then clone YOUR fork
git clone https://github.com/YOUR-USERNAME/repo-name.git
cd repo-name

# Always create a new branch — never work on main
git checkout -b fix/button-typo

# Make your changes, then stage and commit
git add .
git commit -m "fix: correct typo in submit button label"

# Push to YOUR fork
git push origin fix/button-typo

# Then open a Pull Request on GitHub from your fork → original repo`,
      },
      { type: "h2", text: "Step 2: Find the Right Project to Start With" },
      {
        type: "p",
        text: "Don't start with React or Node.js core. Start with something smaller where maintainers are actively welcoming new contributors.",
      },
      {
        type: "ul",
        items: [
          "Look for labels: good first issue, beginner-friendly, help wanted, hacktoberfest",
          "Check when issues were last commented — active projects respond faster",
          "Read the CONTRIBUTING.md before doing anything else",
          "Pick a project you actually use — you understand the product better",
          "Programs like GSSoC, Hacktoberfest, and GSOC list curated beginner-friendly repos",
        ],
      },
      {
        type: "callout",
        text: "GitHub search tip: type 'label:good-first-issue language:TypeScript' to find beginner issues in your preferred language right now.",
      },
      { type: "h2", text: "Step 3: Read Before You Write" },
      {
        type: "p",
        text: "This is where most beginners fail — they jump straight into code without understanding the project. Spend 20–30 minutes before writing a single line:",
      },
      {
        type: "ul",
        items: [
          "Read the README fully — understand what the project does and why",
          "Read CONTRIBUTING.md — every project has different PR rules, commit format, testing requirements",
          "Explore the folder structure — understand where things live",
          "Run the project locally before changing anything",
          "Read the issue thread carefully — often the solution is already hinted at in comments",
        ],
      },
      { type: "h2", text: "Step 4: Comment Before You Code" },
      {
        type: "p",
        text: "Once you find an issue you want to work on, comment on it first. This claims the issue so no one duplicates your work, gets early feedback before you invest hours, and introduces you to the maintainer.",
      },
      {
        type: "code",
        lang: "markdown",
        code: `<!-- Good first comment on an issue -->
Hi! I'd like to take a shot at this.

My approach:
- Locate the Button component in src/components/Button.tsx
- Update the label text from "Sbumit" to "Submit"
- Run the existing tests to make sure nothing breaks

Does this seem right? Happy to take any guidance before I open a PR.`,
      },
      { type: "h2", text: "Step 5: Write a Great Pull Request" },
      {
        type: "p",
        text: "A good PR description is the difference between getting merged quickly and being ignored for weeks. Follow this structure:",
      },
      {
        type: "code",
        lang: "markdown",
        code: `## What does this PR do?
Fixes a typo in the submit button label (closes #42).

## Changes made
- Updated label in src/components/Button.tsx line 34
- "Sbumit" changed to "Submit"

## How to test
1. Run npm run dev
2. Navigate to the contact form
3. Verify the button now reads "Submit"

## Screenshots
[Before screenshot] [After screenshot]`,
      },
      { type: "h2", text: "Step 6: Handle Code Review Like a Pro" },
      {
        type: "p",
        text: "Getting review comments is completely normal — even senior engineers get requested changes. Here's the right mindset:",
      },
      {
        type: "ul",
        items: [
          "Never take review comments personally — they're about the code, not you",
          "Respond to every comment, even if just 'Done!' or 'Fixed in latest commit'",
          "Ask for clarification if you don't understand — maintainers appreciate engaged contributors",
          "Don't force-push after review starts — add new commits so the reviewer can see what changed",
          "Once all comments are addressed, comment: 'All feedback addressed, ready for re-review'",
        ],
      },
      { type: "h2", text: "Common Mistakes Beginners Make" },
      {
        type: "ul",
        items: [
          "Working on the main branch instead of a new feature branch",
          "Not reading CONTRIBUTING.md — missing required tests or commit message format",
          "Opening a huge PR as a first contribution — start small, earn trust",
          "Not running tests locally before pushing",
          "Going silent after receiving review feedback",
          "Opening a PR for an issue already assigned to someone else",
        ],
      },
      { type: "h2", text: "Where to Find Beginner-Friendly Projects" },
      {
        type: "ul",
        items: [
          "GSSoC (GirlScript Summer of Code) — gssoc.girlscript.org — active program with mentors",
          "Hacktoberfest (every October) — active community with thousands of tagged repos",
          "Story Spark AI — github.com/ronisarkarexe/story-spark-ai — always welcoming contributors",
          "First-Issue — my platform built specifically to help beginners find good first issues",
          "Up For Grabs — up-for-grabs.net — aggregates beginner issues across thousands of repos",
        ],
      },
      {
        type: "callout",
        text: "Start today. Don't wait until you feel 'ready'. Pick one issue, read the codebase for 30 minutes, and leave a comment. That's your first step — the rest follows naturally.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
