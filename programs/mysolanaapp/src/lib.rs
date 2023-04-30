use anchor_lang::prelude::*;

declare_id!("7XKKcHWBRrLDLKQgBupgfs531nKGz6P9Kv4MCeEhNWks");

#[program]
pub mod mysolanaapp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, data: String) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        let copy = data.clone();
        base_account.data = data;
        base_account.data_list.push(copy);
        
        msg!("List initialized");
        msg!("current state: {}", base_account.data);
        Ok(())
    }

    pub fn update(ctx: Context<Update>, data: String) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        let copy = data.clone();
        base_account.data = data;
        base_account.data_list.push(copy);

        msg!("updated state: {}", base_account.data);
        Ok(())
    }
}


// Instead of dealing with a counter, create a program that allows us to
// create a message and keep track of all the previously created messages.

// Transaction instructions
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 64 + 64)] // increase storage a LOT
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Transaction instructions
#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

// An account that goes inside a transaction instruction
#[account]
pub struct BaseAccount {
    pub data: String,           // Current data held in state
    pub data_list: Vec<String>, // Vector that holds list of all data ever added
}
