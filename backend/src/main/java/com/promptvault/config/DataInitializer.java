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
        Tag reactTag = seedTag("react");
        Tag gptTag = seedTag("chatgpt");
        Tag reviewTag = seedTag("code-review");

        // 5. Seed Sample Prompts
        if (promptRepository.count() == 0) {
            // Prompt 1: Senior Java Code Reviewer
            Set<Tag> prompt1Tags = new HashSet<>();
            prompt1Tags.add(javaTag);
            prompt1Tags.add(springTag);
            prompt1Tags.add(reviewTag);

            Prompt p1 = Prompt.builder()
                    .title("Senior Enterprise Java & Spring Boot Code Reviewer")
                    .description("Performs deep static analysis, detects memory leaks, SOLID violations, and security flaws in Java code.")
                    .promptText("Act as a Principal Software Architect at Google. Review the following {{language}} snippet written for {{framework}}.\n\nCode Snippet:\n```{{language}}\n{{code_snippet}}\n```\n\nProvide Feedback On:\n1. SOLID Principles Adherence\n2. Memory Leak / Thread Safety Risks\n3. Performance & Time Complexity Optimization\n4. Refactored Production Code")
                    .systemInstruction("You are a strict, senior code reviewer. Never accept substandard code.")
                    .targetModel("GPT-4")
                    .isPublic(true)
                    .isFavorite(true)
                    .user(admin)
                    .category(softwareCat)
                    .tags(prompt1Tags)
                    .build();
            promptRepository.save(p1);

            // Prompt 2: Midjourney Cinematic Character Creator
            Set<Tag> prompt2Tags = new HashSet<>();
            prompt2Tags.add(gptTag);

            Prompt p2 = Prompt.builder()
                    .title("Cinematic Cyberpunk Character Prompt Generator")
                    .description("Generates hyper-realistic 8K photorealistic Midjourney prompts with lighting and camera parameters.")
                    .promptText("Cinematic portrait of a {{character_type}}, futuristic cyberpunk neon cityscape background, volumetric lighting, shot on 85mm lens f/1.4, unreal engine 5 render, hyper-detailed skin texture, --ar 16:9 --style raw --v 6.0")
                    .systemInstruction("Output prompt strings directly optimized for Midjourney v6.")
                    .targetModel("Midjourney v6")
                    .isPublic(true)
                    .isFavorite(false)
                    .user(admin)
                    .category(designCat)
                    .tags(prompt2Tags)
                    .build();
            promptRepository.save(p2);

            System.out.println(">>> SEEDED SAMPLE PROMPTS SUCCESSFULLY!");
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
