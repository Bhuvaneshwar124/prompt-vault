package com.promptvault.config;

import com.promptvault.entity.Category;
import com.promptvault.entity.ERole;
import com.promptvault.entity.Prompt;
import com.promptvault.entity.Role;
import com.promptvault.entity.Tag;
import com.promptvault.entity.User;
import com.promptvault.repository.CategoryRepository;
import com.promptvault.repository.PromptRepository;
import com.promptvault.repository.RoleRepository;
import com.promptvault.repository.TagRepository;
import com.promptvault.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private PromptRepository promptRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed Roles
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseGet(() -> roleRepository.save(new Role(ERole.ROLE_USER)));

        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseGet(() -> roleRepository.save(new Role(ERole.ROLE_ADMIN)));

        // 2. Seed Default Admin User
        User admin = userRepository.findByUsername("admin").orElseGet(() -> {
            Set<Role> adminRoles = new HashSet<>();
            adminRoles.add(userRole);
            adminRoles.add(adminRole);

            User adminUser = User.builder()
                    .username("admin")
                    .email("admin@promptvault.com")
                    .password(passwordEncoder.encode("admin123"))
                    .firstName("System")
                    .lastName("Administrator")
                    .roles(adminRoles)
                    .build();
            return userRepository.save(adminUser);
        });

        // 3. Seed Default Categories
        Category softwareCat = seedCategory("Software Engineering", "Prompts for coding, debugging, architecture, and code reviews", "#6366f1");
        Category writingCat = seedCategory("Writing & Content", "Copywriting, blog posts, social media, and creative storytelling", "#ec4899");
        Category designCat = seedCategory("Design & Midjourney", "Image generation prompts for Midjourney, DALL-E 3, and Stable Diffusion", "#8b5cf6");
        Category dataCat = seedCategory("Data Science & AI", "Data analysis, machine learning prompts, SQL queries, and python scripts", "#10b981");

        // 4. Seed Default Tags
        Tag javaTag = seedTag("java");
        Tag springTag = seedTag("spring-boot");
        Tag gptTag = seedTag("chatgpt");
        Tag reviewTag = seedTag("code-review");
        Tag groqTag = seedTag("groq-speed");

        // 5. Seed Sample Prompts Indexed Across AI Tools (ChatGPT, Gemini, Groq, Claude, DeepSeek)
        if (promptRepository.count() == 0) {
            // Prompt 1: ChatGPT - Senior Java Reviewer
            Set<Tag> p1Tags = new HashSet<>();
            p1Tags.add(javaTag);
            p1Tags.add(springTag);
            p1Tags.add(reviewTag);

            Prompt p1 = Prompt.builder()
                    .title("Senior Enterprise Java & Spring Boot Code Reviewer")
                    .description("Performs deep static analysis, detects memory leaks, SOLID violations, and security flaws.")
                    .promptText("Act as a Principal Architect at Google. Review the following {{language}} snippet written for {{framework}}.\n\nCode:\n```{{language}}\n{{code_snippet}}\n```\n\nProvide Feedback On:\n1. SOLID Principles\n2. Thread Safety & Memory Leak Risks\n3. Refactored Output")
                    .systemInstruction("You are a strict, senior code reviewer.")
                    .targetModel("GPT-4o")
                    .aiTool("ChatGPT")
                    .externalChatUrl("https://chatgpt.com/c/67890-java-code-review-session")
                    .externalChatId("67890-java-code-review-session")
                    .chatSummary("Refactored Spring Boot 2.7 security filter chain and verified memory thread safety.")
                    .isPublic(true)
                    .isFavorite(true)
                    .user(admin)
                    .category(softwareCat)
                    .tags(p1Tags)
                    .build();
            promptRepository.save(p1);

            // Prompt 2: Groq - Ultra Fast LLaMA 3 Code Debugger
            Set<Tag> p2Tags = new HashSet<>();
            p2Tags.add(groqTag);
            p2Tags.add(javaTag);

            Prompt p2 = Prompt.builder()
                    .title("Groq LLaMA-3 Lightning-Fast Bug Fixer")
                    .description("Ultra-low latency code debugging prompt executed on Groq LPU hardware.")
                    .promptText("Find and fix the syntax error or null pointer exception in this {{language}} function:\n\n{{code_snippet}}\n\nExplain the exact root cause in 2 sentences.")
                    .systemInstruction("Be concise and direct. Output fixed code first.")
                    .targetModel("LLaMA 3 70B (Groq)")
                    .aiTool("Groq")
                    .externalChatUrl("https://groq.com/chat/c-88219-llama3-debug")
                    .externalChatId("c-88219-llama3-debug")
                    .chatSummary("Fixed NullPointerException in UserRepository lookup in 300 milliseconds on Groq.")
                    .isPublic(true)
                    .isFavorite(true)
                    .user(admin)
                    .category(softwareCat)
                    .tags(p2Tags)
                    .build();
            promptRepository.save(p2);

            // Prompt 3: Google Gemini - Multimodal Data Analysis
            Prompt p3 = Prompt.builder()
                    .title("Google Gemini Pro Data & SQL Optimizer")
                    .description("Optimizes complex SQL queries and analyzes large dataset schemas.")
                    .promptText("Analyze the following PostgreSQL query for performance bottlenecks:\n\n```sql\n{{sql_query}}\n```\n\nSuggest required B-Tree indexes and execution plan refactoring.")
                    .systemInstruction("Analyze query execution plans deeply.")
                    .targetModel("Gemini 1.5 Pro")
                    .aiTool("Gemini")
                    .externalChatUrl("https://gemini.google.com/app/4f92a0-sql-optimization")
                    .externalChatId("4f92a0-sql-optimization")
                    .chatSummary("Added B-Tree index on user_id and reduced query latency by 85%.")
                    .isPublic(true)
                    .isFavorite(false)
                    .user(admin)
                    .category(dataCat)
                    .tags(p1Tags)
                    .build();
            promptRepository.save(p3);

            System.out.println(">>> SEEDED SAMPLE PROMPTS INDEXED ACROSS CHATGPT, GEMINI, AND GROQ!");
        }
    }

    private Category seedCategory(String name, String description, String colorCode) {
        return categoryRepository.findByName(name).orElseGet(() -> {
            String slug = generateSlug(name);
            Category category = Category.builder()
                    .name(name)
                    .slug(slug)
                    .description(description)
                    .colorCode(colorCode)
                    .build();
            return categoryRepository.save(category);
        });
    }

    private Tag seedTag(String name) {
        String cleanName = name.trim().toLowerCase(Locale.ENGLISH);
        return tagRepository.findByName(cleanName).orElseGet(() -> {
            Tag tag = Tag.builder()
                    .name(cleanName)
                    .slug(generateSlug(cleanName))
                    .build();
            return tagRepository.save(tag);
        });
    }

    private String generateSlug(String text) {
        return text.toLowerCase(Locale.ENGLISH)
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("[\\s-]+", "-")
                .replaceAll("^-+|-+$", "");
    }
}
